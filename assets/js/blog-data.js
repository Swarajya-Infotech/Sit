/**
 * SWARAJYA INFOTECH - Centralized Blog Registry
 * High-Converting Technical Insights Authored by Prasad Nimbalkar in English.
 */

const SWARAJYA_BLOG_POSTS = [
  {
    id: "custom-inventory-management-software",
    slug: "custom-inventory-management-software",
    permalink: "./custom-inventory-management-software.html",
    title: "Custom Inventory Management Software for Small Business: QR Code & RFID Guide (2026)",
    shortDescription: "A comprehensive guide to custom inventory management software using QR code and RFID tracking. Learn how small businesses and Pune manufacturers automate stock control, cut wastage, and scale.",
    category: "ERP & Automation",
    readTime: "9 min read",
    datePublished: "2026-10-22",
    dateModified: "2026-10-22",
    displayDate: "October 22, 2026",
    updatedDate: "October 22, 2026",
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
    featuredImage: "./assets/img/blog/inventory_management_software.jpg",
    imageAlt: "Custom Inventory Management Software using QR Code and RFID - Swarajya Infotech",
    imageCaption: "A complete guide to custom inventory management software, QR code scanning, and RFID tracking for small businesses and manufacturers.",
    tags: [
      "inventory management software",
      "inventory management software for small business",
      "inventory management software using qr code / rfid",
      "custom inventory management software",
      "swarajyainfotech inventory management software",
      "rfid inventory tracking pune"
    ],
    quickAnswer: "Custom inventory management software is a purpose-built application that tracks stock movements from raw material inward to final dispatch in real time. Integrating QR codes and RFID tags with affordable Android handheld scanners eliminates 99% of manual ledger entry errors, prevents stockouts, and cuts audit times from 4 days to 45 minutes with 100% full source code ownership.",
    keyTakeaways: [
      "Eliminate phantom inventory and stockout halts with real-time stock telemetry.",
      "QR code scanning costs virtually ₹0 to print and runs on standard Android devices.",
      "RFID enables contactless bulk scanning of pallets, cartons, and finished goods.",
      "One-time investment (₹25,000 to ₹85,000) with zero recurring monthly per-user SaaS fees.",
      "Swarajya Infotech delivers custom weighbridge, thermal printer, and Tally/GST billing sync."
    ]
  },
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
  return SWARAJYA_BLOG_POSTS.find(p => p.slug === slug) || SWARAJYA_BLOG_POSTS[0];
}
