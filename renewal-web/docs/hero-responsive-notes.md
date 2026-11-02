# Hero framing

Desktop frame: 100svh. Mobile (<768px): min(100svh,75vw), preserving the existing 4:3 compromise. Image: cover, 50% 50%, no CSS transform. Desktop headline unchanged. Hero keeps its existing extra 25svh sticky scroll travel; reduced motion omits it. JS reads actual frame height instead of writing a competing inline CSS variable.

The input ZIP already used min(viewport height, original image ratio height) on desktop. At 3840x2160 this gives approximately the full original image, so excessive zoom at this resolution cannot be established from this ZIP. Native monitor resolution is distinct from CSS viewport size and browser zoom. Top alignment and competing legacy sizing have now been replaced by an explicit central frame.

Comparison: at 1440x900 a ratio-first frame is 810.43px high with the full image visible; a fullscreen frame is 900px and retains 90.05% of image width. At 3840x2160 the two approaches are virtually identical. Fullscreen is chosen on desktop because the court lies within the central safe area of this image. At 390x844 fullscreen would retain only 26% of image width; the retained 4:3 frame keeps about 75% instead. Arbitrary portrait fullscreen + cover cannot show the complete landscape image.

Validation: arithmetic cover geometry for six requested sizes is in hero-crop-measurements.json; these are calculated values, not browser measurements. Browser rendering verification was unavailable (no installed browser). No GSAP, ScrollTrigger, black-panel or striking-video sequence exists in the supplied source. Existing general script, GNB and downstream sections are byte-identical. Image file is unchanged. Existing native Hero scroll listeners are preserved. Future GSAP pinning must be integrated and tested against its actual source.
