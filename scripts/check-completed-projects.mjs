import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const site = new URL(process.argv[2] || 'https://www.agarwalgroup.in').origin;
const canonical = 'https://www.agarwalgroup.in/completed-projects';
const expected = process.argv[3] ? Number(process.argv[3]) : undefined;
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined});
try {
  const context = await browser.newContext({javaScriptEnabled: false});
  const page = await context.newPage();
  const response = await page.goto(site + '/completed-projects', {waitUntil: 'domcontentloaded'});
  assert.equal(response?.status(), 200, 'Gallery request');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonical);
  assert.match(await page.title(), /Completed Real Estate Projects/);
  const images = page.locator('[data-completed-projects] img');
  const count = await images.count();
  assert.ok(count > 0, 'No server-rendered images. Check the host rewrite.');
  if (expected !== undefined) assert.equal(count, expected);
  const map = await context.request.get(site + '/sitemap.xml');
  assert.equal(map.status(), 200);
  const details = await page.evaluate(({xml,canonical}) => {
    const pageOrigin = new URL(canonical).origin;
    const gallery = document.querySelector('[data-completed-projects]');
    const images = [...gallery.querySelectorAll('img')];
    const names = [...gallery.querySelectorAll('h3')].map(h => h.textContent.trim());
    const urls = images.map(el => new URL(el.getAttribute('src'), pageOrigin).href);
    const dom = new DOMParser().parseFromString(xml, 'application/xml');
    const ns = 'http://www.sitemaps.org/schemas/sitemap/0.9';
    const im = 'http://www.google.com/schemas/sitemap-image/1.1';
    const entries = [...dom.getElementsByTagNameNS(ns,'url')].filter(entry =>
      entry.getElementsByTagNameNS(ns,'loc')[0]?.textContent.trim() === canonical);
    return {urls: [...new Set(urls)].sort(), entries: entries.length,
      alts: names.length === images.length && images.every((el,i) => el.alt.startsWith(names[i] + ', ') && el.alt.length > names[i].length + 2),
      listed: [...(entries[0]?.getElementsByTagNameNS(im,'loc') || [])].map(el=>el.textContent.trim()).sort()};
  }, {xml: await map.text(),canonical});
  assert.equal(details.entries,1,'Sitemap entry count');
  assert.ok(details.alts,'Check the project and locality in image alt text');
  assert.deepEqual(details.listed,details.urls,'Sitemap and gallery images differ');
  console.log('PASS: ' + count + ' initial-HTML project images, matching sitemap, titles, locations and route canonical.');
} finally { await browser.close(); }
