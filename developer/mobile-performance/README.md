# Agarwal Group mobile homepage patch

This patch adds a dependency-free click-to-load player. Integrate it into the homepage source before building. The audited build used hashed asset names. Use the project's asset imports so the next build resolves the right URLs.

## Hero and reels

Import ./media.mjs once from the homepage entry (adjust the relative path). In the mobile hero, replace the original video element and any video preload with the link below. Render it in the first HTML response when the framework supports it. Bind the upper-case tokens to actual build URLs. Export a small WebP poster from the opening frame at the mobile hero's aspect ratio. Keep the headline and enquiry CTA outside the player so they work before and after playback. Keep a single active hero at each breakpoint.

    <a data-ag-media="video" href="MOBILE_VIDEO_URL" aria-label="Play Agarwal Group introduction">
      <img src="MOBILE_POSTER_URL" alt="" fetchpriority="high">
      <span>Play video</span>
    </a>

Replace each Instagram embed with a link. Use a local thumbnail and a distinct descriptive label for each reel. Remove the previous Instagram embed script and blockquotes from this homepage. Example using one audited reel:

    <a data-ag-media="reel" href="https://www.instagram.com/reel/DTo5TOAEsSL/"
       aria-label="Watch REEL_DESCRIPTION on Instagram">
      <img src="LOCAL_REEL_THUMBNAIL" alt="" loading="lazy">
      <span>Watch reel</span>
    </a>

Use the existing hero or card wrapper to reserve the correct aspect ratio before loading. Set width and height on thumbnail images to the actual intrinsic dimensions. Size .ag-media-player to fill the reserved wrapper. Style the visible play labels and keyboard focus to suit the existing design. The links also open the media when JavaScript is unavailable. Verify the site's frame policy permits Instagram and any existing consent gate remains in place.

## Other changes in the existing codebase

- Project cards: generate multiple WebP widths from the originals. Start with Skyrise, Horizon and Sky Heights. Set srcset and a sizes value matching the actual card width at each breakpoint. Lazy-load below-the-fold cards. Skyrise alone had 322 KiB estimated savings.
- JavaScript: inspect the production bundle and move route-specific code behind dynamic imports at its route boundary. Preserve the first-screen headline, navigation and enquiry action in the initial render. The audited entry was 1,269 KiB transferred.
- Hosting: set Cache-Control: public, max-age=31536000, immutable only on successful responses for assets whose URLs change with their contents. Keep entry HTML revalidatable, and retain previous hashed assets across releases for already-open pages.
- Accessibility and SEO: increase contrast for project location and price text. Use a section heading followed by the next heading level for card titles. Rename the /about-us link from “READ MORE” to “About Agarwal Group”. Give repeated links distinct accessible names if their destinations differ.

## Verify on staging

1. On a phone-sized cold load with an empty cache, record the network waterfall. Confirm the hero poster and headline appear, there is no hero MP4 request or Instagram player traffic before interaction, and the enquiry CTA works.
2. Play the video and each reel using touch and keyboard. Check focus, native controls, scrolling, layout stability and the hero layout at desktop width.
3. Inspect a project image's currentSrc at two viewport widths. With browser cache enabled, revisit and inspect caching for a hashed asset. Deploy a new build on staging and confirm HTML points to its new assets.
4. Run mobile PageSpeed three times under the same settings. Compare median Speed Index and transferred bytes with the saved baseline (7.8 s and 11,986 KiB). Confirm LCP returns a time. The original test reported NO_LCP. If that persists, inspect the Lighthouse filmstrip and a performance trace before assigning a cause.
