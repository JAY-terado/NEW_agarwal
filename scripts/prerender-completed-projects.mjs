import { chromium } from 'playwright';
import { mkdir, readFile, realpath, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { randomUUID } from 'node:crypto';

const dist = await realpath(resolve(process.argv[2] || 'dist'));
const expected = process.argv[3] === undefined ? undefined : Number(process.argv[3]);
if (expected !== undefined && (!Number.isInteger(expected) || expected < 1)) throw Error('Expected a positive project count.');
const pageUrl = 'https://www.agarwalgroup.in/completed-projects';
const origin = new URL(pageUrl).origin;
const index = await readFile(resolve(dist, 'index.html'), 'utf8');
const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8');
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined});
try {
  const page = await browser.newPage({serviceWorkers: 'block'});
  // Render only this build's assets. No analytics, forms or live APIs are contacted.
  await page.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.origin !== origin || req.method() !== 'GET') return route.abort();
    if (req.isNavigationRequest() && url.href === pageUrl)
      return route.fulfill({contentType: 'text/html', body: index});
    const file = resolve(dist, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(dist + sep)) return route.abort();
    try { await route.fulfill({path: file}); } catch { await route.abort(); }
  });
  await page.goto(pageUrl, {waitUntil: 'domcontentloaded'});
  await page.locator('[data-completed-projects] img').first().waitFor({state: 'attached'});
  await page.waitForFunction(url => document.querySelector('link[rel="canonical"]')?.href === url, pageUrl);
  const result = await page.evaluate(async ({index, sitemap, pageUrl, expected}) => {
    const gallery = document.querySelector('[data-completed-projects]');
    const imgs = [...gallery.querySelectorAll('img')];
    const headings = [...gallery.querySelectorAll('h3')];
    if (!imgs.length || imgs.length !== headings.length || (expected && imgs.length !== expected))
      throw Error('Project count mismatch: ' + imgs.length + ' images / ' + headings.length + ' cards.');
    const urls = imgs.map((image, i) => {
      const name = headings[i].textContent.trim();
      if (!image.alt.startsWith(name + ', ') || !image.alt.slice(name.length + 2).trim())
        throw Error('Missing location in alt text for ' + name);
      const url = new URL(image.getAttribute('src'), pageUrl);
      if (url.origin !== location.origin) throw Error('Expected a local project image: ' + url);
      return url.href;
    });
    await Promise.all([...new Set(urls)].map(async url => {
      const img = new Image(); img.src = url;
      try { await img.decode(); } catch { throw Error('Could not decode build asset ' + url); }
    }));
    const doc = new DOMParser().parseFromString(index, 'text/html');
    const root = doc.querySelector('#root');
    if (!root) throw Error('Missing React mount point #root.');
    // Pre-render the portfolio inside the existing React mount point. createRoot
    // replaces this markup with the full application when its bundle starts.
    root.replaceChildren(doc.importNode(gallery, true));
    const allTags = [...document.head.querySelectorAll('[data-completed-seo-default]')];
    if (!document.title.includes('Completed') || !allTags.some(tag => tag.matches('title')) ||
        !allTags.some(tag => tag.matches('link[rel="canonical"]')) ||
        !allTags.some(tag => tag.matches('meta[name="description"]')))
      throw Error('Required page metadata was not applied.');
    for (const tag of allTags) {
      const key = ['rel','name','property'].find(key => tag.hasAttribute(key));
      const selector = tag.localName + (key ? '[' + key + '="' + tag.getAttribute(key) + '"]' : '');
      const matches = doc.head.querySelectorAll(selector);
      if (matches.length !== 1) throw Error('Expected one template tag for ' + selector);
      matches[0].replaceWith(doc.importNode(tag, true));
    }
    const xml = new DOMParser().parseFromString(sitemap, 'application/xml');
    const ns = 'http://www.sitemaps.org/schemas/sitemap/0.9';
    const imgNs = 'http://www.google.com/schemas/sitemap-image/1.1';
    if (xml.documentElement.localName !== 'urlset' || xml.documentElement.namespaceURI !== ns)
      throw Error('Expected a sitemap urlset in dist/sitemap.xml.');
    const entries = [...xml.getElementsByTagNameNS(ns, 'url')].filter(el =>
      el.getElementsByTagNameNS(ns, 'loc')[0]?.textContent.trim() === pageUrl);
    if (entries.length !== 1) throw Error('Expected one sitemap entry for ' + pageUrl);
    const entry = entries[0];
    xml.documentElement.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:image', imgNs);
    for (const old of [...entry.getElementsByTagNameNS(imgNs, 'image')]) old.remove();
    for (const url of new Set(urls)) {
      const img = xml.createElementNS(imgNs, 'image:image');
      const loc = xml.createElementNS(imgNs, 'image:loc');
      loc.textContent = url; img.append(loc); entry.append(img);
    }
    return {html: '<!doctype html>\n' + doc.documentElement.outerHTML + '\n',
      xml: '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(xml).replace(/^<\?xml\s+[^?]*\?>\s*/i, '') + '\n',
      cards: imgs.length, images: new Set(urls).size};
  }, {index, sitemap, pageUrl, expected});
  for (const [path, data] of [['completed-projects/index.html', result.html], ['sitemap.xml', result.xml]]) {
    const target = resolve(dist, path);
    await mkdir(dirname(target), {recursive: true});
    const tmp = target + '.' + randomUUID() + '.tmp';
    await writeFile(tmp, data);
    await rename(tmp, target);
  }
  console.log('Verified ' + result.cards + ' project cards and wrote ' + result.images + ' image sitemap entries.');
} finally { await browser.close(); }
