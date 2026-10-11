/**
 * SWARAJYA INFOTECH - Centralized Blog Registry
 * High-Converting Technical Insights Authored by Prasad Nimbalkar in English.
 */

const SWARAJYA_BLOG_POSTS = [
  {
    id: "website-development-cost-pune",
    slug: "website-development-cost-pune",
    permalink: "./website-development-cost-pune.html",
    title: "Website Development Cost in Pune: The Complete Guide for Small & Growing Businesses (2026)",
    shortDescription: "A comprehensive pricing guide on business website development in Pune. Understand costs for basic, corporate, and e-commerce websites, domain, hosting, AMC, and agency versus freelancer benchmarks.",
    category: "Website Development",
    readTime: "8 min read",
    datePublished: "2026-04-10",
    dateModified: "2026-10-11",
    displayDate: "April 10, 2026",
    updatedDate: "October 11, 2026",
    author: {
      name: "Prasad Nimbalkar",
      role: "Lead Software Engineer",
      company: "Swarajya Infotech",
      avatar: "./assets/img/team/prasad_nimbalkar.jpg",
      profileUrl: "./author-prasad-nimbalkar.html",
      bio: "Prasad Nimbalkar is a Lead Software Engineer and Technical Author at Swarajya Infotech in Pune, Maharashtra. Specializing in high-performance web engineering, enterprise ERP architectures, and business automation.",
      social: {
        linkedin: "https://www.linkedin.com/in/prasadnimbalkar-net?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagram: "https://www.instagram.com/prasad.nimbalkar_?vrfl=MXJlNzdwbDQ3cDRuNg==",
        whatsapp: "https://wa.me/919404190417"
      }
    },
    reviewer: {
      name: "Shubham Walekar",
      role: "COO & CMO",
      avatar: "./assets/img/team/shubham.png"
    },
    featuredImage: "./assets/img/blog/website_development_cost_pune.jpg",
    imageAlt: "Website Development Cost in Pune 2026 Guide by Prasad Nimbalkar - Swarajya Infotech",
    imageCaption: "A complete guide to website design and development pricing tiers for businesses in Pune, Maharashtra.",
    tags: ["website development cost in pune", "website design cost in pune", "website development cost for small business", "pune it company", "web development maharashtra"],
    quickAnswer: "In Pune, a professional business website typically costs <strong>₹12,000 to ₹25,000</strong> for a standard corporate website, <strong>₹25,000 to ₹55,000</strong> for a dynamic product catalog or manufacturing portal, and <strong>₹45,000 to ₹1,20,000+</strong> for an e-commerce store or custom web application. Essential ongoing annual costs for domain, cloud hosting, SSL, and maintenance average ₹4,000 to ₹12,000 per year.",
    
    keyTakeaways: [
      "Standard business websites (5–8 pages) in Pune range between ₹12,000 to ₹22,000 with mobile-first responsive architecture.",
      "MIDC, Chakan, and Bhosari industrial B2B portals with product catalogs cost ₹25,000 to ₹55,000.",
      "E-commerce websites with automated payment gateways (Razorpay, UPI) cost ₹45,000 to ₹95,000.",
      "Annual recurring essentials: Domain (₹800 - ₹1,200/yr) and High-Speed Cloud SSD Hosting (₹3,500 - ₹8,000/yr).",
      "Swarajya Infotech develops lightweight custom code (HTML5/Bootstrap/Node/PHP) with integrated WhatsApp and Google Sheets CRM automation instead of vulnerable bloated plugins."
    ]
  }
];

function getAllBlogPosts() {
  return SWARAJYA_BLOG_POSTS;
}

function getBlogPostBySlug(slug) {
  return SWARAJYA_BLOG_POSTS[0];
}
