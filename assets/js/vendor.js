/**
 * SITNAM IT SOLUTIONS - Vendor Initialization Helper
 * Ensures smooth setup of PureCounter, Swiper, GLightbox, Isotope, and AOS.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize PureCounter if present
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  // Initialize GLightbox
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});
