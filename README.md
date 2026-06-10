## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Google Sheets Setup

## 1. Create a Google Sheet

Create a new Google Sheet and add the following columns:

Name | Email | LinkedIn | FullTime | Team | Startup | Timestamp

## 2. Create Apps Script

Open:

Extensions → Apps Script

Paste:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name || "",
    data.email || "",
    data.linkedin || "",
    data.fullTime || "",
    data.team || "",
    data.startup || "",
    new Date()
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 3. Deploy

Deploy → New Deployment → Web App

Execute as:

* Me

Who has access:

* Anyone

Copy the generated Web App URL.

## 4. Configure Environment Variable

Create `.env.local`

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=<WEB_APP_URL>
```

## 5. Restart Application

```bash
npm run dev
```

Form submissions will now be stored in the configured Google Sheet.
