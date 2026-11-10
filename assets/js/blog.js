/**
 * SWARAJYA INFOTECH - Blog Directory & Grid Handler (100% English)
 * Hardened with DOM XSS sanitization and robust input encoding.
 * Integrates with assets/js/blog-data.js to display clean, fast article cards.
 */

(function () {
  "use strict";

  let currentCategory = "All";
  let currentSearchQuery = "";

  /**
   * Safe HTML string escaper to eliminate DOM XSS risks
   */
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderCategoryFilters(posts) {
    const filterContainer = document.getElementById("blogFilterContainer");
    if (!filterContainer) return;

    const rawCategories = ["All", ...new Set(posts.map(p => p.category))];

    filterContainer.innerHTML = rawCategories.map(cat => {
      const count = cat === "All" ? posts.length : posts.filter(p => p.category === cat).length;
      const isActive = cat === currentCategory ? "active" : "";
      const safeCat = escapeHtml(cat);
      const safeCount = Number(count) || 0;
      return `
        <button type="button" class="blog-filter-btn ${isActive}" data-category="${safeCat}">
          ${safeCat} <span class="badge rounded-pill bg-secondary ms-1 opacity-75">${safeCount}</span>
        </button>
      `;
    }).join("");

    filterContainer.querySelectorAll(".blog-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterContainer.querySelectorAll(".blog-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category") || "All";
        renderBlogGrid();
      });
    });
  }

  function renderBlogGrid() {
    const grid = document.getElementById("blogPostsGrid");
    const noResults = document.getElementById("noBlogsFound");
    if (!grid) return;

    const allPosts = typeof getAllBlogPosts === "function" ? getAllBlogPosts() : [];
    let filtered = allPosts;

    if (currentCategory !== "All") {
      filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (currentSearchQuery.trim() !== "") {
      const q = currentSearchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = "";
      if (noResults) noResults.classList.remove("d-none");
      return;
    }

    if (noResults) noResults.classList.add("d-none");

    grid.innerHTML = filtered.map(post => {
      const postLink = encodeURI(post.permalink || `./${post.slug}.html`);
      const postImg = encodeURI(post.featuredImage || "./assets/img/blog/website_development_cost_pune.jpg");
      const postDesc = escapeHtml(post.shortDescription || "");
      const postTitle = escapeHtml(post.title || "Technical Guide");
      const postCat = escapeHtml(post.category || "Engineering");
      const postDate = escapeHtml(post.displayDate || "April 10, 2026");
      const readTime = escapeHtml(post.readTime || "8 min read");
      const authorName = escapeHtml(post.author ? post.author.name : "Prasad Nimbalkar");
      const authorRole = escapeHtml(post.author ? post.author.role : "Lead Software Engineer");
      const authorAvatar = encodeURI((post.author && post.author.avatar) ? post.author.avatar : "./assets/img/team/prasad_nimbalkar.jpg");

      return `
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <article class="glass-card blog-card">
            <div class="blog-card-img-wrapper">
              <img src="${postImg}" alt="${postTitle}" class="blog-card-img" loading="lazy" decoding="async">
              <span class="blog-card-badge">${postCat}</span>
            </div>
            <div class="blog-card-body">
              <div class="blog-meta">
                <span><i class="bi bi-calendar3 me-1 text-primary"></i>${postDate}</span>
                <span>&bull;</span>
                <span><i class="bi bi-clock me-1 text-info"></i>${readTime}</span>
              </div>
              <h3 class="blog-title" title="${postTitle}">
                <a href="${postLink}" class="text-white text-decoration-none">
                  ${postTitle}
                </a>
              </h3>
              <p class="blog-excerpt">${postDesc}</p>
              <div class="blog-author-wrapper">
                <a href="./author-prasad-nimbalkar.html">
                  <img src="${authorAvatar}" alt="${authorName}" class="blog-author-avatar" style="object-fit: cover;" loading="lazy">
                </a>
                <div class="flex-grow-1">
                  <div class="blog-author-name">
                    <a href="./author-prasad-nimbalkar.html" class="text-white text-decoration-none">${authorName}</a>
                  </div>
                  <div class="blog-read-time">${authorRole}</div>
                </div>
                <a href="${postLink}" class="btn btn-sm btn-outline-info rounded-pill" aria-label="Read ${postTitle}">
                  Read Guide <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join("");
  }

  function setupSearch() {
    const searchInput = document.getElementById("blogSearchInput");
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearchQuery = (e.target.value || "").trim();
        renderBlogGrid();
      }, 200);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const allPosts = typeof getAllBlogPosts === "function" ? getAllBlogPosts() : [];
    
    // Strict URL query parameter sanitation
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("category");
    if (catParam) {
      const decoded = decodeURIComponent(catParam).trim();
      if (allPosts.some(p => p.category === decoded)) {
        currentCategory = decoded;
      }
    }

    renderCategoryFilters(allPosts);
    renderBlogGrid();
    setupSearch();
  });

})();
