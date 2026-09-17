import Script from 'next/script'

/** Legacy theme scripts — load late so they don't block first paint. */
export function ChariticsScripts() {
  return (
    <>
      <Script src="/assets/vendor/bootstrap/bootstrap.bundle.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/splide/splide.min.js" strategy="lazyOnload" />
      <Script
        src="/assets/vendor/splide/splide-extension-auto-scroll.min.js"
        strategy="lazyOnload"
      />
      <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/slim-select/slimselect.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/animate-wow/wow.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/splittype/index.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/mixitup/mixitup.min.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/fslightbox/fslightbox.js" strategy="lazyOnload" />
      <Script src="/assets/vendor/flatpickr/flatpickr.js" strategy="lazyOnload" />
      <Script src="/assets/js/main.js" strategy="lazyOnload" />
      <Script src="/assets/js/tab.js" strategy="lazyOnload" />
      <Script src="/assets/js/accordion.js" strategy="lazyOnload" />
      <Script src="/assets/js/progressbar.js" strategy="lazyOnload" />
    </>
  )
}
