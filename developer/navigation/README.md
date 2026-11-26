# Agarwal Group navigation update

Integrate the seven anchors from priority-links.html into the existing homepage navigation or shared Quick Links list. If the layout uses a component or data array, copy the labels and hrefs into its existing data source in the supplied order. Reuse the current styles and mobile menu controls. Move existing entries for these destinations to their new positions and keep other navigation destinations accessible. Applying this patch adds the reference markup. The live change takes effect when the integrated site is built and deployed.

## Staging check

Open the homepage on mobile and desktop. Read the links top to bottom or in keyboard focus order and compare them with priority-links.html. Open each one and confirm it lands on the intended page. In particular, the first link should open ongoing projects and the fourth should open completed projects.

## Google Search

Use Search Console URL Inspection to check that Google can index each destination. After deploying, inspect the homepage and check that the rendered HTML contains the seven anchors. Google automatically chooses organic sitelinks for each query and controls their order. The order in this patch is the requested website navigation order.

Google guidance: https://developers.google.com/search/docs/appearance/sitelinks
