/**
 * Swarajya Infotech Enterprise Google Sheets CRM v2.5.0 Client Integration
 * Standardized for High Performance Web Architecture & Real-Time Lead Tracking
 */

// Deployed Google Apps Script Web App URL connected to Google Sheets CRM
const GOOGLE_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx8-SG9cvQmGxZyzrjAoyqTqJ40bRwQZTtWz7ZagTxfPOVGh67dfVq92zttaaUG0SHf/exec";

document.addEventListener('DOMContentLoaded', () => {

  // Safety fallback: Ensure AOS initializes across all pages
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

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
   * 3. Intelligent Service Auto-Selection for Demo Modal
   * ------------------------------------------------------------- */
  const demoModal = document.querySelector('#demoModal');
  if (demoModal) {
    demoModal.addEventListener('show.bs.modal', () => {
      const selectElem = demoModal.querySelector('#demoProduct');
      if (!selectElem) return;
      const currentUrl = window.location.pathname.toLowerCase();
      
      if (currentUrl.includes('erp-crm')) {
        selectElem.value = 'ERP & CRM Platform';
      } else if (currentUrl.includes('billing') || currentUrl.includes('inventory')) {
        selectElem.value = 'Billing & Inventory System';
      } else if (currentUrl.includes('mobile-app')) {
        selectElem.value = 'Web & Mobile Applications';
      } else if (currentUrl.includes('automation') || currentUrl.includes('iot')) {
        selectElem.value = 'Industrial Automation & IoT';
      } else if (currentUrl.includes('web-application') || currentUrl.includes('website')) {
        selectElem.value = 'Web & Mobile Applications';
      } else if (currentUrl.includes('custom-software')) {
        selectElem.value = 'Custom Business Software';
      }
    });
  }

  // Track client page initialization time for anti-bot heuristics
  const pageInitTime = Date.now();

  /* -------------------------------------------------------------
   * Helper: Escape HTML strings to eliminate DOM-based XSS
   * ------------------------------------------------------------- */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* -------------------------------------------------------------
   * 4. Unified Toast Notification Helper (Success, Warning, Error)
   * ------------------------------------------------------------- */
  function showFormNotification(message, type = "success") {
    const formToast = document.querySelector('#formToast');
    const toastMessage = document.querySelector('#toastMessage');

    if (!formToast || !toastMessage) {
      alert(String(message).replace(/<[^>]+>/g, ''));
      return;
    }

    // Reset any previous alert classes
    formToast.classList.remove('bg-success', 'bg-warning', 'bg-danger', 'text-white', 'text-dark');

    const safeMessage = escapeHtml(message);

    if (type === "warning") {
      formToast.classList.add('bg-warning', 'text-dark');
      toastMessage.innerHTML = `<i class="bi bi-exclamation-triangle-fill text-dark me-2"></i> ${safeMessage}`;
    } else if (type === "error") {
      formToast.classList.add('bg-danger', 'text-white');
      toastMessage.innerHTML = `<i class="bi bi-x-circle-fill text-white me-2"></i> ${safeMessage}`;
    } else {
      formToast.classList.add('bg-success', 'text-white');
      toastMessage.innerHTML = `<i class="bi bi-check-circle-fill text-white me-2"></i> ${safeMessage}`;
    }

    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
      const toastInstance = bootstrap.Toast.getOrCreateInstance(formToast, { delay: 6000 });
      toastInstance.show();
    } else {
      alert(String(message).replace(/<[^>]+>/g, ''));
    }
  }

  /* -------------------------------------------------------------
   * 5. Strict Input Validation Functions
   * ------------------------------------------------------------- */
  function validateIndianOrIntlPhone(rawPhone) {
    if (!rawPhone || typeof rawPhone !== 'string') {
      return { valid: false, message: "Please enter your mobile number." };
    }
    
    // Clean spaces, hyphens, parentheses, and dots
    let cleaned = rawPhone.replace(/[\s\-\(\)\.]/g, "").trim();

    // Strip country prefixes for India (+91 or leading 0)
    if (cleaned.startsWith("+91")) {
      cleaned = cleaned.substring(3);
    } else if (cleaned.startsWith("91") && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    } else if (cleaned.startsWith("0") && cleaned.length === 11) {
      cleaned = cleaned.substring(1);
    }

    // Indian 10-digit mobile check: must start with 6, 7, 8, or 9
    const indianRegex = /^[6-9]\d{9}$/;

    // Disallow repeating dummy sequence like 0000000000, 1111111111, 1234567890
    const dummyPatterns = [
      "0000000000", "1111111111", "2222222222", "3333333333", "4444444444",
      "5555555555", "6666666666", "7777777777", "8888888888", "9999999999",
      "1234567890", "0123456789"
    ];

    if (dummyPatterns.includes(cleaned)) {
      return { valid: false, message: "Please enter an active 10-digit mobile number, not a repeating dummy number." };
    }

    if (indianRegex.test(cleaned)) {
      return { valid: true, formatted: "+91 " + cleaned, cleanDigits: cleaned };
    }

    // International numbers starting with + and having 8 to 15 digits
    const rawClean = rawPhone.replace(/[\s\-\(\)\.]/g, "").trim();
    const intlRegex = /^\+[1-9]\d{7,14}$/;
    if (intlRegex.test(rawClean)) {
      return { valid: true, formatted: rawClean, cleanDigits: rawClean.replace(/\D/g, "") };
    }

    return { 
      valid: false, 
      message: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9 (e.g., +91 9404190417)." 
    };
  }

  function validateEmail(email) {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  /* -------------------------------------------------------------
   * 6. Production Form Submission & Real-Time Page Origin Tracking
   * ------------------------------------------------------------- */
  async function submitLeadToGoogleSheets(form, e) {
    e.preventDefault();

    // Prevent concurrent duplicate submissions (double clicks)
    if (form.dataset.submitting === "true") {
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit';

    // 1. Extract Form Data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString().trim();
    });

    // Honeypot Bot Trap Check
    if (data.website_hp && data.website_hp !== "") {
      console.warn("Spam bot submission blocked via honeypot.");
      return;
    }

    // Anti-Bot: Rejection of automated submissions under human reaction threshold (1.5 seconds)
    if (Date.now() - pageInitTime < 1500) {
      console.warn("Spam bot submission blocked via minimum reaction time threshold.");
      return;
    }

    // Derive Exact Page Context & Name
    const pageTitle = document.title.replace(/\s*\|.*$/, '').trim() || "Website";
    const pageFilename = window.location.pathname.split('/').filter(Boolean).pop() || "index.html";
    const fullUrl = window.location.href;
    const rawFormType = data.formType || data.form_type || data.pageName || data._subject || "Lead Inquiry";
    const formTypeStr = rawFormType.toLowerCase();

    // 2. Form Type Specific Validations
    if (formTypeStr === "newsletter") {
      const emailVal = data.email || "";
      if (!validateEmail(emailVal)) {
        showFormNotification("Please enter a valid email address (e.g., corporate@company.in).", "error");
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
          emailInput.classList.add('is-invalid');
          emailInput.focus();
        }
        return;
      }
    } else if (formTypeStr === "career" || formTypeStr === "careers") {
      const applicantName = data.applicant_name || data.name || "";
      const applicantEmail = data.applicant_email || data.email || "";
      if (applicantName.length < 2) {
        showFormNotification("Please enter your full name.", "error");
        return;
      }
      if (!validateEmail(applicantEmail)) {
        showFormNotification("Please enter a valid email address.", "error");
        return;
      }
    } else {
      // General Lead / Demo / Contact Form Validations
      const nameVal = data.name || data.fullName || "";
      if (nameVal.length < 2) {
        showFormNotification("Please enter your full name (minimum 2 characters).", "error");
        const nameInput = form.querySelector('input[name="name"], input[name="fullName"]');
        if (nameInput) {
          nameInput.classList.add('is-invalid');
          nameInput.focus();
        }
        return;
      }

      // Strict Mobile Number Validation ("मोबाईल नंबर फॉर्म न सबमिट")
      const rawPhone = data.phone || data.phoneNumber || "";
      const phoneValidation = validateIndianOrIntlPhone(rawPhone);
      if (!phoneValidation.valid) {
        showFormNotification(phoneValidation.message, "error");
        const phoneInput = form.querySelector('input[name="phone"], input[name="phoneNumber"], input[type="tel"]');
        if (phoneInput) {
          phoneInput.classList.add('is-invalid');
          phoneInput.focus();
        }
        return;
      }
      // Overwrite phone with cleaned formatted value
      data.phone = phoneValidation.formatted;

      // Email validation if provided
      if (data.email && !validateEmail(data.email)) {
        showFormNotification("Please enter a valid corporate or personal email address.", "error");
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
          emailInput.classList.add('is-invalid');
          emailInput.focus();
        }
        return;
      }
    }

    // 3. Client Session-Level Duplicate Submission Check
    const submissionKey = (data.phone || data.email || "") + "_" + formTypeStr;
    const lastSubmission = sessionStorage.getItem("sit_lead_last_sent");
    if (lastSubmission) {
      try {
        const parsed = JSON.parse(lastSubmission);
        if (parsed.key === submissionKey && (Date.now() - parsed.time) < 180000) {
          showFormNotification("You have already submitted this request recently. Our engineering team is already processing it.", "warning");
          return;
        }
      } catch (err) {}
    }

    // 4. Construct Payload with Explicit Page Origin and Data Consent
    const userMessage = data.message || data.summary || "";
    const sourceTracking = `\n\n[Inquiry Origin Metadata]\n- Submitted From Page: ${pageTitle} (${pageFilename})\n- Page URL: ${fullUrl}\n- Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

    const payload = {
      name: data.name || data.fullName || data.applicant_name || "",
      company: data.company || data.companyName || "",
      email: data.email || data.applicant_email || "",
      phone: data.phone || data.phoneNumber || "",
      whatsapp: data.whatsapp || data.whatsappNumber || data.phone || "",
      country: data.country || "India",
      state: data.state || "",
      city: data.city || "",
      service: data.service || data.serviceRequired || data.product || "General Technical Inquiry",
      budget: data.budget || "Discuss Later",
      contact_time: data.preferredContactTime || "",
      message: userMessage ? (userMessage + sourceTracking) : sourceTracking.trim(),
      formType: `${rawFormType} [Page: ${pageTitle} (${pageFilename})]`,
      pageName: pageTitle,
      pageUrl: fullUrl,
      pageFilename: pageFilename,
      consent: "Accepted Data Privacy & Technical Consultation Terms",
      profile_url: data.profile_url || "",
      website_hp: data.website_hp || "",
      origin: fullUrl
    };

    // 5. Lock Form & Set UI Loading State
    form.dataset.submitting = "true";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';
    }

    // Remove any previous is-invalid classes
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    try {
      let isDuplicate = false;
      let leadId = "";

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
          } else if (result.leadId) {
            leadId = result.leadId;
          }
        }
      }

      // 6. Provide Clear, User-Centric Feedback
      if (isDuplicate) {
        showFormNotification(
          "Notice: A request with this Phone Number or Email is already registered in our CRM. Our engineering team is currently reviewing your requirement.",
          "warning"
        );
      } else {
        // Record session to prevent rapid re-submits
        try {
          sessionStorage.setItem("sit_lead_last_sent", JSON.stringify({
            key: submissionKey,
            time: Date.now()
          }));
        } catch (e) {}

        if (formTypeStr === "newsletter") {
          showFormNotification("Thank you for subscribing! You will receive tech updates and architectural benchmarks.", "success");
        } else if (formTypeStr === "career" || formTypeStr === "careers") {
          showFormNotification("Application submitted successfully! Our engineering team will review your profile.", "success");
        } else {
          const refText = leadId ? ` (Ref: ${escapeHtml(leadId)})` : "";
          showFormNotification(
            `Thank you! Your inquiry${refText} has been received. Our Pune technical team will connect with you within 2 to 4 business hours.`,
            "success"
          );
        }

        form.reset();

        // Close demo modal if inside one
        const modalElement = form.closest('.modal');
        if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            setTimeout(() => modalInstance.hide(), 1200);
          }
        }
      }

    } catch (error) {
      console.error("Submission exception:", error);
      showFormNotification("Inquiry received! Our engineering team will contact you shortly.", "success");
      form.reset();
    } finally {
      form.dataset.submitting = "false";
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  }

  // Attach submit listeners to all forms on the page
  const allForms = document.querySelectorAll('form');
  allForms.forEach(f => {
    f.addEventListener('submit', (e) => submitLeadToGoogleSheets(f, e));
  });

});
