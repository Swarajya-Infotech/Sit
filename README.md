# Swarajya Infotech Enterprise Google Sheets CRM v2.5.0 Architecture & Operation Guide

**Company Name:** Swarajya Infotech  
**Owner:** Prasad Raje  
**Primary Admin Email:** `prasadnimbalkar2555@gmail.com`  
**Support Line:** `+91 9404190417`  
**GitHub Repository:** [https://github.com/Its-Prasad-Raje/sit-software](https://github.com/Its-Prasad-Raje/sit-software)  
**Live Site URL:** [https://its-prasad-raje.github.io/sit-software/](https://its-prasad-raje.github.io/sit-software/)  

---

## 🏛️ 1. Architecture Overview

Swarajya Infotech Enterprise CRM v2.5.0 implements a **100% Serverless, Zero-Maintenance Architecture** bridging a static GitHub Pages web frontend directly to Google Workspace infrastructure:

```
+-------------------------------------------------------------+
|                      VISITOR / USER                         |
|   (Browser: Chrome, Safari, Firefox, Edge | Mobile/Desktop) |
+-------------------------------------------------------------+
                              |
                              v [AJAX Fetch API POST (JSON Payload)]
+-------------------------------------------------------------+
|                 Swarajya Infotech WEBSITE (GITHUB PAGES)                  |
|    HTML5 + CSS3 + Bootstrap 5.3 + Vanilla JS (custom.js)    |
+-------------------------------------------------------------+
                              |
                              v [CORS / Google Apps Script API Web App]
+-------------------------------------------------------------+
|               GOOGLE APPS SCRIPT API GATEWAY                |
|  - Rate Limiter (CacheService: 5 req/min per IP/Session)    |
|  - Honeypot Anti-Spam Trap Validator                       |
|  - Concurrency Lock Engine (LockService 10s wait)           |
|  - Multi-Form Router (Contact, Demo, Career, Ticket, etc.)  |
+-------------------------------------------------------------+
                              |
                              v [Batch Spreadsheet Writing & Cache Lookup]
+-------------------------------------------------------------+
|              GOOGLE SHEETS ENTERPRISE CRM DATABASE           |
|  1. Dashboard        5. Budget          9. System_Log       |
|  2. Website_Leads    6. Lead_Status    10. Settings         |
|  3. Customers        7. Follow_Up      11. Version_Info     |
|  4. Services         8. Users          12. Reports          |
+-------------------------------------------------------------+
```

---

## 🚀 2. One-Click Setup & Deployment Guide

1. Open [Google Sheets](https://sheets.google.com) logged into **`prasadnimbalkar2555@gmail.com`**.
2. Create a Spreadsheet named **`Swarajya Infotech CRM`** inside Google Drive folder `Swarajya Infotech Business Suite`.
3. Click **Extensions &rarr; Apps Script**.
4. Paste the entire code from [`google_apps_script/Code.gs`](file:///e:/web/google_apps_script/Code.gs) into `Code.gs`.
5. Click 💾 **Save**.
6. Select function **`setupCRM`** in the top dropdown and click **Run**.  
   *&rarr; Initializes all 12 sheets, formats headers (`#0F172A`), freezes row 1, populates seed data, and builds the Executive Dashboard!*
7. Click **Deploy &rarr; New deployment** &rarr; Select type: **Web app**.
   - **Execute as**: **`Me (prasadnimbalkar2555@gmail.com)`**
   - **Who has access**: **`Anyone`**
8. Copy the generated **Web App URL**.
9. Open [`assets/js/custom.js`](file:///e:/web/assets/js/custom.js) line 8 and set `GOOGLE_SCRIPT_WEB_APP_URL`.
10. Push to **GitHub Pages**.

---

## 🛠️ 3. Administrator & Operations Guide

### Custom Google Spreadsheet Admin Menu ("Swarajya Infotech Enterprise CRM")
Opening your Google Spreadsheet renders a top-level custom menu:
- 🔄 **`Repair & Setup CRM Engine`**: Self-heals missing sheets or broken headers.
- 📊 **`Refresh Executive Dashboard & Reports`**: Recalculates real-time lead analytics & KPIs.
- 📁 **`Backup Spreadsheet (Google Drive)`**: Generates an instant timestamped copy of the CRM.
- 🛡️ **`Security & System Audit`**: Opens an alert summary of total logged security events.
- ℹ️ **`About Swarajya Infotech Enterprise Suite`**: Displays version details & support channels.

---

## 🔒 4. Security & Audit Policy

- **Rate Limiting**: `CacheService` restricts client IP / sessions to a maximum of 5 submissions per minute.
- **Honeypot Protection**: Silent invisible trap `website_hp` blocks bot submissions.
- **Duplicate Prevention**: In-memory cache scan blocks duplicate Phone Numbers or Emails.
- **Audit Logging**: Every action, spam attempt, validation failure, or error is recorded in `System_Log`.

---

## 🔮 5. Future Expansion Guide

Adding a new Web Form (e.g., *Partner Registration*, *Product Enquiry*, *Support Ticket*) requires **zero script changes**:
1. Simply add form fields in HTML.
2. Call `submitUniversalForm(form, 'Partner Registration', e)` in JS.
3. The Multi-Form Router in `Code.gs` automatically processes, logs, and routes the submission!
