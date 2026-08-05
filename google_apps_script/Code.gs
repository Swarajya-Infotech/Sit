/**
 * SIT Enterprise Google Sheets CRM v2.5.0 - Hardened Code.gs
 * Architected by Google Apps Script Staff Engineer & Workspace Standards
 * Account: prasadnimbalkar2555@gmail.com
 * Owner: Prasad Raje (+91 9404190417)
 * Repository: https://github.com/Its-Prasad-Raje/sit-software
 * Live Site: https://its-prasad-raje.github.io/sit-software/
 */

const CONFIG = {
  TIMEZONE: "Asia/Kolkata",
  LEAD_PREFIX: "SIT",
  RATE_LIMIT_MAX: 5,
  RATE_LIMIT_WINDOW_SEC: 60,
  SHEETS: {
    DASHBOARD: { name: "Dashboard", color: "#1E293B", headers: [] },
    WEBSITE_LEADS: { 
      name: "Website_Leads", 
      color: "#0F172A", 
      headers: ["Lead ID", "Date", "Time", "Name", "Company", "Email", "Phone", "WhatsApp", "Country", "State", "City", "Service", "Budget", "Message", "Status", "Assigned To", "Remarks"] 
    },
    CUSTOMERS: { 
      name: "Customers", 
      color: "#0F172A", 
      headers: ["Customer ID", "Customer Name", "Company", "Phone", "Email", "Service Opted", "Total Value", "Status", "Created Date"] 
    },
    SERVICES: { 
      name: "Services", 
      color: "#0F172A", 
      headers: ["Service ID", "Service Name", "Category", "Base Price", "Description"] 
    },
    BUDGET: { 
      name: "Budget", 
      color: "#0F172A", 
      headers: ["Budget ID", "Tier Name", "Range", "Priority"] 
    },
    LEAD_STATUS: { 
      name: "Lead_Status", 
      color: "#0F172A", 
      headers: ["Status Code", "Status Name", "Description", "Color Code"] 
    },
    FOLLOW_UP: { 
      name: "Follow_Up", 
      color: "#0F172A", 
      headers: ["FollowUp ID", "Lead ID", "Client Name", "Phone", "Follow-up Date", "Remark", "Assigned User", "Next Action"] 
    },
    USERS: { 
      name: "Users", 
      color: "#0F172A", 
      headers: ["User ID", "Full Name", "Email", "Role", "Status"] 
    },
    SYSTEM_LOG: { 
      name: "System_Log", 
      color: "#0F172A", 
      headers: ["Timestamp", "Event Type", "Reason / Category", "Details", "IP / Origin", "Status"] 
    },
    SETTINGS: { 
      name: "Settings", 
      color: "#0F172A", 
      headers: ["Configuration Key", "Configuration Value", "Description"] 
    },
    VERSION_INFO: { 
      name: "Version_Info", 
      color: "#0F172A", 
      headers: ["Version", "Release Date", "Updated By", "Description"] 
    },
    REPORTS: { 
      name: "Reports", 
      color: "#0F172A", 
      headers: ["Report Metric", "Value / Count", "Last Updated"] 
    },
    CAREERS: {
      name: "Careers",
      color: "#0F172A",
      headers: ["Application ID", "Date", "Full Name", "Email", "Profile URL", "Summary", "Status"]
    },
    SUPPORT_TICKETS: {
      name: "Support_Tickets",
      color: "#0F172A",
      headers: ["Ticket ID", "Timestamp", "Name", "Email", "Issue Details", "Priority", "Status"]
    },
    NEWSLETTER: {
      name: "Newsletter_Subscribers",
      color: "#0F172A",
      headers: ["Subscriber ID", "Timestamp", "Email", "Status"]
    }
  }
};

function onOpen() {
  SpreadsheetApp.getUi().createMenu('SIT CRM')
      .addItem('🔄 Repair & Setup CRM Structure', 'setupCRM')
      .addItem('📊 Refresh Reports & Dashboard', 'refreshDashboardAndReports')
      .addItem('📁 Backup CRM Sheet', 'backupCRM')
      .addItem('🛡️ Security & System Log Audit', 'showSecurityLogs')
      .addSeparator()
      .addItem('ℹ️ About SIT CRM', 'showAbout')
      .addToUi();
}

function setupCRM() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var scriptProps = PropertiesService.getScriptProperties();
  scriptProps.setProperty("SYSTEM_VERSION", "v2.5.0");
  scriptProps.setProperty("ADMIN_EMAIL", "prasadnimbalkar2555@gmail.com");
  scriptProps.setProperty("INITIALIZED_AT", new Date().toISOString());

  for (var key in CONFIG.SHEETS) {
    var cfg = CONFIG.SHEETS[key];
    var sheet = ss.getSheetByName(cfg.name);
    if (!sheet) {
      sheet = ss.insertSheet(cfg.name);
    }
    if (cfg.headers.length > 0 && sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, cfg.headers.length).setValues([cfg.headers]);
      sheet.getRange(1, 1, 1, cfg.headers.length)
           .setBackground(cfg.color)
           .setFontColor("#FFFFFF")
           .setFontWeight("bold");
      sheet.setFrozenRows(1);
      sheet.setRowHeight(1, 40);
      sheet.setHiddenGridlines(false);
      
      sheet.autoResizeColumns(1, cfg.headers.length);
    }
  }

  populateSeedData(ss);
  buildDashboard(ss);
  buildReports(ss);

  SpreadsheetApp.getUi().alert('✅ SIT CRM Enterprise Architecture Verified & Initialized Successfully!');
}

function populateSeedData(ss) {
  var sSheet = ss.getSheetByName(CONFIG.SHEETS.SERVICES.name);
  if (sSheet && sSheet.getLastRow() <= 1) {
    sSheet.getRange(2, 1, 3, 5).setValues([
      ["S001", "ERP Development", "Software", "₹1,50,000", "Enterprise resource planning software"],
      ["S002", "Custom CRM / Web App", "Web", "₹75,000", "Tailored web applications"],
      ["S003", "Mobile App Development", "Mobile", "₹1,00,000", "Android & iOS apps"]
    ]);
  }

  var bSheet = ss.getSheetByName(CONFIG.SHEETS.BUDGET.name);
  if (bSheet && bSheet.getLastRow() <= 1) {
    bSheet.getRange(2, 1, 4, 4).setValues([
      ["B001", "Under ₹50,000", "0 - 50000", "Low"],
      ["B002", "₹50,000 - ₹1,00,000", "50000 - 100000", "Medium"],
      ["B003", "₹1,00,000 - ₹2,50,000", "100000 - 250000", "High"],
      ["B004", "₹2,50,000+", "250000+", "Enterprise"]
    ]);
  }

  var lsSheet = ss.getSheetByName(CONFIG.SHEETS.LEAD_STATUS.name);
  if (lsSheet && lsSheet.getLastRow() <= 1) {
    lsSheet.getRange(2, 1, 6, 4).setValues([
      ["NEW", "New Lead", "Newly received inquiry", "#3B82F6"],
      ["CONT", "Contacted", "Initial call completed", "#F59E0B"],
      ["QUO", "Quotation Sent", "Proposal shared", "#8B5CF6"],
      ["WON", "Won", "Deal closed successfully", "#10B981"],
      ["LOST", "Lost", "Deal dropped", "#EF4444"],
      ["SPAM", "Spam", "Invalid or bot submission", "#6B7280"]
    ]);
  }

  var setSheet = ss.getSheetByName(CONFIG.SHEETS.SETTINGS.name);
  if (setSheet && setSheet.getLastRow() <= 1) {
    setSheet.getRange(2, 1, 8, 3).setValues([
      ["Company Name", "SIT", "Official Business Name"],
      ["Company Email", "prasadnimbalkar2555@gmail.com", "Primary Admin Contact"],
      ["Phone", "+91 9404190417", "Support Line"],
      ["Timezone", CONFIG.TIMEZONE, "System Timezone"],
      ["Lead Prefix", CONFIG.LEAD_PREFIX, "Prefix for Auto Lead IDs"],
      ["Website", "https://its-prasad-raje.github.io/sit-software/", "GitHub Pages Site"],
      ["GitHub URL", "https://github.com/Its-Prasad-Raje/sit-software", "Source Repository"],
      ["Apps Script Version", "v2.5.0", "Current Release"]
    ]);
  }

  var vSheet = ss.getSheetByName(CONFIG.SHEETS.VERSION_INFO.name);
  if (vSheet && vSheet.getLastRow() <= 1) {
    vSheet.getRange(2, 1, 1, 4).setValues([
      ["v2.5.0", "2026-08-05", "prasadnimbalkar2555@gmail.com", "Full Enterprise CRM Upgrade with Multi-Form Routing & Caching Engine"]
    ]);
  }

  var uSheet = ss.getSheetByName(CONFIG.SHEETS.USERS.name);
  if (uSheet && uSheet.getLastRow() <= 1) {
    uSheet.getRange(2, 1, 1, 5).setValues([
      ["U001", "Prasad Raje", "prasadnimbalkar2555@gmail.com", "Administrator", "Active"]
    ]);
  }
}

function buildDashboard(ss) {
  var dSheet = ss.getSheetByName(CONFIG.SHEETS.DASHBOARD.name);
  if (!dSheet) return;
  dSheet.clear();
  
  dSheet.getRange("B2").setValue("🚀 SIT Enterprise CRM - Executive Dashboard").setFontSize(16).setFontWeight("bold");
  
  var kpis = [
    ["Total Leads", "=COUNTA(Website_Leads!A2:A)", "#3B82F6"],
    ["Today's Leads", '=COUNTIF(Website_Leads!B2:B, TEXT(TODAY(),"yyyy-MM-dd"))', "#10B981"],
    ["Won Leads", '=COUNTIF(Website_Leads!O2:O, "Won")', "#8B5CF6"],
    ["Lost Leads", '=COUNTIF(Website_Leads!O2:O, "Lost")', "#EF4444"],
    ["Pending Leads", '=COUNTIF(Website_Leads!O2:O, "New")', "#F59E0B"]
  ];

  for (var i = 0; i < kpis.length; i++) {
    var col = 2 + (i * 3);
    dSheet.getRange(4, col, 1, 2).merge().setValue(kpis[i][0]).setBackground("#F1F5F9").setFontWeight("bold").setHorizontalAlignment("center");
    dSheet.getRange(5, col, 2, 2).merge().setFormula(kpis[i][1]).setFontSize(18).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  }
}

function buildReports(ss) {
  var rSheet = ss.getSheetByName(CONFIG.SHEETS.REPORTS.name);
  if (!rSheet) return;
  rSheet.clear();
  rSheet.getRange(1, 1, 1, 3).setValues([["Report Metric", "Value / Count", "Last Updated"]]);
  rSheet.getRange(1, 1, 1, 3).setBackground("#0F172A").setFontColor("#FFFFFF").setFontWeight("bold");
  rSheet.setFrozenRows(1);
  rSheet.setHiddenGridlines(false);
  
  var now = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss");
  rSheet.appendRow(["Total Leads Pipeline", "=COUNTA(Website_Leads!A2:A)", now]);
  rSheet.appendRow(["Total Won Deals", '=COUNTIF(Website_Leads!O2:O, "Won")', now]);
  rSheet.appendRow(["Total Lost Deals", '=COUNTIF(Website_Leads!O2:O, "Lost")', now]);
}

function refreshDashboardAndReports() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  buildDashboard(ss);
  buildReports(ss);
  SpreadsheetApp.getUi().alert('📊 Dashboard and Reports refreshed successfully!');
}

function backupCRM() {
  var file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var folder = file.getParents().hasNext() ? file.getParents().next() : DriveApp.getRootFolder();
  var dateStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd_HH-mm");
  file.makeCopy("SIT_CRM_Backup_" + dateStr, folder);
  SpreadsheetApp.getUi().alert('📁 Backup created successfully in your Google Drive!');
}

function showSecurityLogs() {
  SpreadsheetApp.getUi().alert('🛡️ Security & System Log Audit: Check the "System_Log" tab for full tracking of Spam, Duplicates, and Validation errors.');
}

function showAbout() {
  SpreadsheetApp.getUi().alert('ℹ️ SIT Enterprise CRM v2.5.0\nDeveloped for prasadnimbalkar2555@gmail.com\nRepository: https://github.com/Its-Prasad-Raje/sit-software\nLive Site: https://its-prasad-raje.github.io/sit-software/');
}

function isRateLimited(identifier) {
  var cache = CacheService.getScriptCache();
  var key = "rl_" + identifier.replace(/[^a-zA-Z0-9_]/g, "");
  var count = parseInt(cache.get(key) || "0", 10);
  if (count >= CONFIG.RATE_LIMIT_MAX) {
    return true;
  }
  cache.put(key, (count + 1).toString(), CONFIG.RATE_LIMIT_WINDOW_SEC);
  return false;
}

function isDuplicateContactCached(sheet, phone, email) {
  if (!sheet || sheet.getLastRow() <= 1) return false;

  var cache = CacheService.getScriptCache();
  var cachedData = cache.get("duplicate_contacts");
  var list = [];

  if (cachedData) {
    try {
      list = JSON.parse(cachedData);
    } catch (e) {
      list = getContactsFromSheet(sheet);
    }
  } else {
    list = getContactsFromSheet(sheet);
    try {
      cache.put("duplicate_contacts", JSON.stringify(list), 300);
    } catch (cErr) {}
  }

  var cleanPhone = phone.replace(/[^0-9]/g, "");
  var cleanEmail = email.toLowerCase().trim();

  for (var i = 0; i < list.length; i++) {
    if (cleanEmail && list[i].email === cleanEmail) return true;
    if (cleanPhone && cleanPhone.length >= 7 && list[i].phone.indexOf(cleanPhone) !== -1) return true;
  }
  return false;
}

function getContactsFromSheet(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  var data = sheet.getRange(2, 6, lastRow - 1, 2).getValues();
  var list = [];
  for (var i = 0; i < data.length; i++) {
    list.push({
      email: String(data[i][0] || "").trim().toLowerCase(),
      phone: String(data[i][1] || "").replace(/[^0-9]/g, "")
    });
  }
  return list;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(30000)) {
      return createJsonResponse({ status: "error", message: "Server busy. Please try again." }, 429);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var logSheet = ss.getSheetByName(CONFIG.SHEETS.SYSTEM_LOG.name);
    var timestamp = new Date();
    var dateStr = Utilities.formatDate(timestamp, CONFIG.TIMEZONE, "yyyy-MM-dd");
    var timeStr = Utilities.formatDate(timestamp, CONFIG.TIMEZONE, "HH:mm:ss");
    var origin = data.origin || "GitHub Pages";
    var formType = (data.formType || data.form_type || "Contact Form").toLowerCase();

    if (isRateLimited(origin)) {
      if (logSheet) logSheet.appendRow([timestamp, "Security", "Rate Limit", "Too many requests from origin", origin, "Rejected"]);
      return createJsonResponse({ status: "error", message: "Rate limit exceeded. Please wait a minute." }, 429);
    }

    if (data.website_hp && data.website_hp.toString().trim() !== "") {
      if (logSheet) logSheet.appendRow([timestamp, "Security", "Spam", "Honeypot trap triggered", origin, "Rejected"]);
      return createJsonResponse({ status: "error", message: "Spam detected." }, 400);
    }

    if (formType === "newsletter") {
      var nSheet = ss.getSheetByName(CONFIG.SHEETS.NEWSLETTER.name);
      var subEmail = String(data.email || "").trim();
      if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
        return createJsonResponse({ status: "error", message: "Valid email is required for newsletter." }, 400);
      }
      nSheet.appendRow(["SUB" + Utilities.formatString("%04d", nSheet.getLastRow()), timestamp, subEmail, "Subscribed"]);
      if (logSheet) logSheet.appendRow([timestamp, "Newsletter", "Success", "Subscriber: " + subEmail, origin, "OK"]);
      return createJsonResponse({ status: "success", message: "Thank you for subscribing!" }, 200);
    }

    if (formType === "career" || formType === "careers") {
      var cSheet = ss.getSheetByName(CONFIG.SHEETS.CAREERS.name);
      var applicantName = String(data.applicant_name || data.name || "").trim();
      var applicantEmail = String(data.applicant_email || data.email || "").trim();
      if (!applicantName || !applicantEmail) {
        return createJsonResponse({ status: "error", message: "Name and Email required." }, 400);
      }
      cSheet.appendRow(["APP" + Utilities.formatString("%04d", cSheet.getLastRow()), dateStr, applicantName, applicantEmail, data.profile_url || "", data.summary || "", "Under Review"]);
      if (logSheet) logSheet.appendRow([timestamp, "Career", "Success", "Applicant: " + applicantName, origin, "OK"]);
      return createJsonResponse({ status: "success", message: "Career application submitted successfully!" }, 200);
    }

    if (formType === "support" || formType === "ticket") {
      var tSheet = ss.getSheetByName(CONFIG.SHEETS.SUPPORT_TICKETS.name);
      var ticketId = "TCK" + Utilities.formatString("%05d", tSheet.getLastRow());
      tSheet.appendRow([ticketId, timestamp, data.name || "", data.email || "", data.message || data.issue || "", "Medium", "Open"]);
      if (logSheet) logSheet.appendRow([timestamp, "Support Ticket", "Success", "Ticket ID: " + ticketId, origin, "OK"]);
      return createJsonResponse({ status: "success", ticketId: ticketId, message: "Support Ticket created: " + ticketId }, 200);
    }

    var name = (data.name || data.fullName || "").toString().trim();
    var phone = (data.phone || data.phoneNumber || "").toString().trim();
    var email = (data.email || "").toString().trim();

    if (!name || !phone) {
      if (logSheet) logSheet.appendRow([timestamp, "Validation", "Validation Failed", "Missing mandatory fields", origin, "Rejected"]);
      return createJsonResponse({ status: "error", message: "Name and Phone Number are required." }, 400);
    }

    var leadSheet = ss.getSheetByName(CONFIG.SHEETS.WEBSITE_LEADS.name);
    var isDuplicate = isDuplicateContactCached(leadSheet, phone, email);

    if (isDuplicate) {
      if (logSheet) logSheet.appendRow([timestamp, "Duplicate", "Duplicate", "Duplicate lead detected: " + phone, origin, "Rejected"]);
      return createJsonResponse({ status: "exists", message: "Lead already registered.", duplicate: true }, 200);
    }

    var lastRow = leadSheet ? leadSheet.getLastRow() : 1;
    var leadId = CONFIG.LEAD_PREFIX + Utilities.formatString("%06d", lastRow);

    leadSheet.appendRow([
      leadId, dateStr, timeStr,
      name, data.company || "", email, 
      phone, data.whatsapp || phone, data.country || "India", 
      data.state || "", data.city || "", data.service || "General Inquiry", 
      data.budget || "Discuss Later", data.message || "", "New", "Unassigned", "Form: " + formType
    ]);

    CacheService.getScriptCache().remove("duplicate_contacts");

    if (logSheet) {
      logSheet.appendRow([timestamp, "Lead Submission", "Success", "New lead added: " + leadId, origin, "OK"]);
    }

    return createJsonResponse({ status: "success", leadId: leadId, message: "Thank you. Your request has been submitted successfully." }, 200);

  } catch (err) {
    var logSheet = ss.getSheetByName(CONFIG.SHEETS.SYSTEM_LOG.name);
    if (logSheet) {
      logSheet.appendRow([new Date(), "Exception", "Server Error", err.toString(), "Unknown", "Error"]);
    }
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function doGet(e) {
  return createJsonResponse({ status: "active", version: "v2.5.0", timestamp: new Date() }, 200);
}

function createJsonResponse(payload, code) {
  return ContentService.createTextOutput(JSON.stringify(payload))
                      .setMimeType(ContentService.MimeType.JSON);
}
