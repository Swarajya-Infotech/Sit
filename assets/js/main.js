/**
 * SITNAM IT SOLUTIONS - Main Layout & Component Handler
 */

(function() {
  "use strict";

  // Sticky Header Effect
  const header = document.querySelector('.header-swarajya');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const backToTop = document.querySelector('#backToTop');
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);

  // Back to Top Trigger
  const backToTopBtn = document.querySelector('#backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize Swiper for Testimonials & Client Logos
  window.addEventListener('load', () => {
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
      new Swiper('.testimonial-swiper', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 30 }
        }
      });
    }

    // Isotope Filter Initialization
    if (typeof Isotope !== 'undefined' && document.querySelector('.portfolio-container')) {
      const portfolioContainer = document.querySelector('.portfolio-container');
      const iso = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      const filtersElem = document.querySelectorAll('.portfolio-filters li');
      filtersElem.forEach(filterLi => {
        filterLi.addEventListener('click', function() {
          document.querySelector('.portfolio-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          const filterValue = this.getAttribute('data-filter');
          iso.arrange({ filter: filterValue });
        });
      });
    }
  });

})();
