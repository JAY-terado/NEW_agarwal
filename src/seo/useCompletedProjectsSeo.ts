import { useEffect } from 'react';

const title = 'Completed Real Estate Projects | Agarwal Group';
const description = 'Explore completed Agarwal Group projects in Mumbai, Vasai and Virar. Browse project images, names and localities.';
const canonical = 'https://www.agarwalgroup.in/completed-projects';
const fields: [string, string | null, string][] = [
  ['title', null, title],
  ['link[rel="canonical"]', 'href', canonical],
  ['meta[name="description"]', 'content', description],
  ['meta[property="og:title"]', 'content', title],
  ['meta[property="og:description"]', 'content', description],
  ['meta[property="og:url"]', 'content', canonical],
  ['meta[name="twitter:title"]', 'content', title],
  ['meta[name="twitter:description"]', 'content', description],
];

export function useCompletedProjectsSeo() {
  useEffect(() => {
    const restore: (() => void)[] = [];
    for (const [selector, attribute, value] of fields) {
      const tag = document.head.querySelector<HTMLElement>(selector);
      if (!tag) continue;
      const read = () => attribute ? tag.getAttribute(attribute) : tag.textContent;
      const write = (v: string | null) => {
        if (!attribute) tag.textContent = v;
        else if (v === null) tag.removeAttribute(attribute);
        else tag.setAttribute(attribute, v);
      };
      // The static page carries the original template values for SPA navigation.
      const baseline = tag.dataset.completedSeoDefault ?? JSON.stringify(read());
      tag.dataset.completedSeoDefault = baseline;
      write(value);
      restore.push(() => {
        if (read() === value) write(JSON.parse(baseline));
        delete tag.dataset.completedSeoDefault;
      });
    }
    return () => restore.forEach(reset => reset());
  }, []);
}
