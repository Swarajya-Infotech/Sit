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

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('load', handleScroll, { passive: true });

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

      const filtersElem = document.querySelectorAll('.portfolio-filters li, .portfolio-filters button');
      filtersElem.forEach(filterLi => {
        filterLi.addEventListener('click', function() {
          const activeEl = document.querySelector('.portfolio-filters .filter-active, .portfolio-filters .active');
          if (activeEl) {
            activeEl.classList.remove('filter-active', 'active');
          }
          this.classList.add('active'); // Keep .active for bootstrap styling
          this.classList.add('filter-active'); // Keep .filter-active for legacy CSS compatibility
          const filterValue = this.getAttribute('data-filter');
          iso.arrange({ filter: filterValue });
        });
      });
    }
  });


  // Custom Cursor Animation (High Performance Hardware Accelerated)
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');

    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursorOutline);
    document.body.appendChild(cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(animateCursor);
      }
    }, { passive: true });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;

      cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
      cursorGlow.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(mouseX - outlineX) > 0.1 || Math.abs(mouseY - outlineY) > 0.1) {
        requestAnimationFrame(animateCursor);
      } else {
        isMoving = false;
      }
    }

    // Delegated Hover detection to eliminate hundreds of listeners and MutationObserver thrashing
    document.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest('a, button, .glass-card, input, select, textarea, .nav-link-swarajya');
      if (interactive) {
        cursorOutline.style.width = '48px';
        cursorOutline.style.height = '48px';
        cursorOutline.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      const interactive = e.target.closest('a, button, .glass-card, input, select, textarea, .nav-link-swarajya');
      if (interactive) {
        cursorOutline.style.width = '32px';
        cursorOutline.style.height = '32px';
        cursorOutline.style.backgroundColor = 'transparent';
      }
    }, { passive: true });
  }
})();

