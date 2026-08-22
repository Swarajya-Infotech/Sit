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


  // Custom Cursor Animation (Low Load)
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

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Fast update for dot
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth update for outline & glow via requestAnimationFrame
    function animateCursor() {
      // Easing factor (lower is smoother/slower)
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      
      cursorGlow.style.left = outlineX + 'px';
      cursorGlow.style.top = outlineY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for links and buttons
    const setupHoverEffects = () => {
      const hoverElements = document.querySelectorAll('a, button, .glass-card, input, select, textarea');
      hoverElements.forEach(el => {
        // Prevent adding multiple listeners
        if (el.dataset.cursorAttached) return;
        el.dataset.cursorAttached = 'true';
        
        el.addEventListener('mouseenter', () => {
          cursorOutline.style.width = '50px';
          cursorOutline.style.height = '50px';
          cursorOutline.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
          cursorOutline.style.width = '32px';
          cursorOutline.style.height = '32px';
          cursorOutline.style.backgroundColor = 'transparent';
        });
      });
    };
    
    // Initial setup
    setupHoverEffects();
    
    // Setup again if DOM changes (e.g. dynamic elements)
    const observer = new MutationObserver(() => {
        setupHoverEffects();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();

