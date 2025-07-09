# CronMailer: Next.js Cron Email Scheduler

Effortlessly schedule and automate emails using cron jobs, with a beautiful and modern UI. Built with Next.js, Node.js, and TypeScript.

---

## ✨ Features
- Schedule promotional or transactional emails using cron expressions
- Modern, responsive UI/UX
- Inline validation and helpful tooltips
- Uses Node.js, Next.js API routes, and nodemailer
- Easily extensible for other cron-based automations

---

## 📸 Screenshots
<!--
Add screenshots or a GIF here to showcase the UI/UX.
Example:
![Screenshot](./screenshots/main-form.png)
-->

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Cronjob
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory with your SMTP credentials:
```env
SMTP_HOST=smtp.your-email.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-email-password
```
> **Tip:** Use environment variables for sensitive data. You can use [Mailtrap](https://mailtrap.io/) or any SMTP provider for testing.

### 4. Run the development server
```bash
npm run dev
```

### 5. Open your browser
Go to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ How Cron Jobs Work in This App
- When you submit the form, the backend validates your email and cron expression.
- If valid, it schedules a Node.js cron job (using `node-cron`) to send an email at the specified times.
- Emails are sent using `nodemailer` and your SMTP credentials.
- Each scheduled job is kept in memory (restarts will clear jobs; for production, use a persistent scheduler).

---

## 📝 Usage
1. Enter the recipient's email address.
2. Enter a cron schedule (e.g. `0 9 * * *` for every day at 9:00 AM).
   - Need help? Use [crontab.guru](https://crontab.guru/) for examples.
3. Click **Schedule Email**.
4. You'll see a success or error message.

---

## 🧩 How to Extend
- To send custom messages, add more fields to the form and API (see `src/types/index.ts`).
- To persist jobs, integrate with a database or use a job queue (e.g. Bull, Agenda).
- To support recurring or one-off jobs, adjust the backend logic in `src/pages/api/schedule-email.ts`.

---

## 📂 Project Structure
```
Cronjob/
├── src/
│   ├── components/           # UI components
│   ├── pages/                # Next.js pages & API routes
│   └── types/                # TypeScript types
├── package.json
├── tsconfig.json
└── README.md
```

---
