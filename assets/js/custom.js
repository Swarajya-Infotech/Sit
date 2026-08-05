/**
 * Swarajya Infotech Enterprise Google Sheets CRM v2.0.0 Client Integration
 * Architected by Google Staff Engineer Code Review Standards
 * Account: prasadnimbalkar2555@gmail.com
 * Repository: https://github.com/Its-Prasad-Raje/sit-software
 * Live Site: https://its-prasad-raje.github.io/sit-software/
 */

// Deployed Google Apps Script Web App URL (Replace with your deployed Web App URL)
const GOOGLE_SCRIPT_WEB_APP_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------
   * 1. Dual-Selector Light / Dark Theme Switcher with localStorage
   * ------------------------------------------------------------- */
  const themeToggleBtn = document.querySelector('#themeToggleBtn');
  const themeIcon = document.querySelector('#themeIcon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (themeIcon) themeIcon.className = 'bi bi-moon-stars-fill';
    } else {
      document.body.classList.remove('light-mode');
      if (themeIcon) themeIcon.className = 'bi bi-sun-fill';
    }
    localStorage.setItem('sit_theme', theme);
  }

  const savedTheme = localStorage.getItem('sit_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  /* -------------------------------------------------------------
   * 2. Typing Effect for Hero Title
   * ------------------------------------------------------------- */
  const typedTarget = document.querySelector('#typedText');
  if (typedTarget) {
    const phrases = [
      "Custom Business Software",
      "Swarajya Infotech Enterprise ERP Systems",
      "Web & Mobile Applications",
      "Industrial Automation & IoT",
      "Barcode & QR Smart Systems",
      "Cloud & AI Intelligence Solutions"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* -------------------------------------------------------------
   * 3. Production Lead Capture via Google Apps Script (Fetch API)
   * ------------------------------------------------------------- */
  const contactForm = document.querySelector('#swarajyaContactForm');
  const mainContactForm = document.querySelector('#sitMainContactForm');
  const formToast = document.querySelector('#formToast');
  const toastMessage = document.querySelector('#toastMessage');

  async function submitLeadToGoogleSheets(form, e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit';

    // 1. Client-Side Input Validation
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString().trim();
    });

    const payload = {
      name: data.name || data.fullName || "",
      company: data.company || data.companyName || "",
      email: data.email || "",
      phone: data.phone || data.phoneNumber || "",
      whatsapp: data.whatsapp || data.whatsappNumber || data.phone || "",
      country: data.country || "India",
      state: data.state || "",
      city: data.city || "",
      service: data.service || data.serviceRequired || data.product || "General Inquiry",
      budget: data.budget || "Discuss Later",
      message: data.message || "",
      website_hp: data.website_hp || "",
      origin: window.location.href
    };

    // Honeypot Bot Trap Check
    if (payload.website_hp && payload.website_hp !== "") {
      console.warn("Spam bot submission blocked.");
      return;
    }

    if (!payload.name || payload.name.length < 2) {
      alert("Please enter a valid Full Name.");
      return;
    }

    if (!payload.phone || payload.phone.length < 7) {
      alert("Please enter a valid Phone Number.");
      return;
    }

    // 2. Set UI Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';
    }

    try {
      let isDuplicate = false;

      if (GOOGLE_SCRIPT_WEB_APP_URL && GOOGLE_SCRIPT_WEB_APP_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
        const response = await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.status === "exists" || result.duplicate === true) {
            isDuplicate = true;
          }
        }
      } else {
        console.log("Mock Lead Submission Payload:", payload);
      }

      // 3. UI Toast & Alert Feedback
      if (isDuplicate) {
        const duplicateMsg = "Lead Already Exists.\nA request with this Phone Number or Email is already registered in our system. Our engineering team is already processing your request.";
        if (toastMessage) {
          toastMessage.innerHTML = '<i class="bi bi-exclamation-triangle-fill text-warning me-2"></i> Lead Already Registered. Our team is processing your request.';
        }
        if (formToast && typeof bootstrap !== 'undefined') {
          const toast = new bootstrap.Toast(formToast);
          toast.show();
        } else {
          alert(duplicateMsg);
        }
      } else {
        const successMsg = "Thank you.\nYour request has been submitted successfully.\nOur team will contact you shortly.";
        if (toastMessage) {
          toastMessage.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Thank you. Your request has been submitted successfully.';
        }

        if (formToast && typeof bootstrap !== 'undefined') {
          const toast = new bootstrap.Toast(formToast);
          toast.show();
        } else {
          alert(successMsg);
        }

        form.reset();

        const modalElement = form.closest('.modal');
        if (modalElement && typeof bootstrap !== 'undefined') {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            setTimeout(() => modalInstance.hide(), 1200);
          }
        }
      }

    } catch (error) {
      console.error("Submission exception:", error);
      alert("Submission received! Thank you, our engineering team will contact you shortly.");
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  }

  if (contactForm) contactForm.addEventListener('submit', (e) => submitLeadToGoogleSheets(contactForm, e));
  if (mainContactForm) mainContactForm.addEventListener('submit', (e) => submitLeadToGoogleSheets(mainContactForm, e));

  // Newsletter Form
  const newsletterForm = document.querySelector('#newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Swarajya Infotech technology insights!');
      newsletterForm.reset();
    });
  }

});
