import Script from 'next/script'

export function ChariticsScripts() {
  return (
    <>
      <Script src="/assets/vendor/bootstrap/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/splide/splide.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/vendor/splide/splide-extension-auto-scroll.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/slim-select/slimselect.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/animate-wow/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/splittype/index.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/mixitup/mixitup.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/fslightbox/fslightbox.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/flatpickr/flatpickr.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
      <Script src="/assets/js/tab.js" strategy="afterInteractive" />
      <Script src="/assets/js/accordion.js" strategy="afterInteractive" />
      <Script src="/assets/js/progressbar.js" strategy="afterInteractive" />
    </>
  )
}
