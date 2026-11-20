# Agarwal Group website media fix

## Apply to the frontend

Extract this ZIP and place agarwal-media.patch in the frontend repository root. Run the following commands there.

```sh
git apply --check agarwal-media.patch
git apply agarwal-media.patch
npm run build
```

The patch includes eight WebP thumbnails and the React changes for Home, Infinity, Sky Heights and Skyrise. Each thumbnail comes from its corresponding testimonial MP4. The carousel uses the existing Play buttons and modal. The hero chooses its desktop source at widths of 768 px and above and uses its mobile source below that breakpoint.

Review the changes in your normal preview environment. Deploy the generated Vite production build using your existing hosting process.

## Verify the release

1. Open the homepage in Chrome DevTools at a 390 px viewport. Open Network, enable Disable cache, filter by Media and reload. The only first-party MP4 URL before interaction should be heroVideosMobile/heroMobile.mp4. The browser may issue multiple byte-range requests for this one URL.
2. Scroll through the testimonial carousel. Photos should appear. Tap Play on a card and confirm only that testimonial starts downloading and plays with sound. Close the player and try another card.
3. Repeat from a fresh load at a desktop width, such as 1440 px. The homepage hero should use hero.mp4. Check the three project pages at both widths for their corresponding hero variants.
4. Repeat the mobile PageSpeed test after deployment. Compare total transfer size and Speed Index with the previous mobile run (about 255 MB and 25.9 seconds).

[Previous mobile PageSpeed report](https://pagespeed.web.dev/analysis/https-agarwalgroup-in/cc9xvinss0?form_factor=mobile)

The patch was applied to a clean copy of the publicly served page sources and the edited TSX files passed syntax checks. The full application build and the live network test require the frontend repository and deployment.
