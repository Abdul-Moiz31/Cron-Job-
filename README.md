# CronMailer: The Complete Guide to Cron Jobs & Email Scheduling

Effortlessly schedule and automate emails using cron jobs, with a beautiful and modern UI. Built with Next.js, Node.js, and TypeScript.

---

## 📚 Table of Contents
1. [What is a Cron Job?](#what-is-a-cron-job)
2. [Cron Syntax Basics](#cron-syntax-basics)
3. [Cron Expression Examples](#cron-expression-examples)
4. [Advanced Cron Usage](#advanced-cron-usage)
5. [Debugging Cron Jobs](#debugging-cron-jobs)
6. [Using CronMailer](#using-cronmailer)
7. [Project Setup](#project-setup)
8. [How CronMailer Works](#how-cronmailer-works)
9. [Extending CronMailer](#extending-cronmailer)

---

## 1. What is a Cron Job?
A **cron job** is a scheduled task that runs automatically at specified times or intervals. Cron is a time-based job scheduler in Unix-like operating systems, but the concept is widely used in programming and automation.

- **Use cases:**
  - Sending scheduled emails
  - Backing up data
  - Running reports
  - Cleaning up files

## 2. Cron Syntax Basics
A cron expression is a string with five fields separated by spaces:

```
* * * * *
| | | | |
| | | | +----- Day of week (0 - 7) (Sunday=0 or 7)
| | | +------- Month (1 - 12)
| | +--------- Day of month (1 - 31)
| +----------- Hour (0 - 23)
+------------- Minute (0 - 59)
```

- **Asterisk (*)** means "every value" (e.g., every minute, every hour).
- **Comma (,)** separates multiple values (e.g., `1,15,30`).
- **Hyphen (-)** specifies a range (e.g., `1-5`).
- **Slash (/)** specifies step values (e.g., `*/10` means every 10 units).

## 3. Cron Expression Examples
| Expression      | Meaning                        |
|----------------|--------------------------------|
| `* * * * *`    | Every minute                   |
| `0 * * * *`    | Every hour (at minute 0)       |
| `0 9 * * *`    | Every day at 9:00 AM           |
| `0 0 * * 0`    | Every Sunday at midnight       |
| `*/15 9-17 * * 1-5` | Every 15 min, 9AM-5PM, Mon-Fri |

- **Tip:** Use [crontab.guru](https://crontab.guru/) to build and test expressions.

## 4. Advanced Cron Usage
- **Special Strings:**
  - `@yearly` (or `@annually`): once a year, `0 0 1 1 *`
  - `@monthly`: once a month, `0 0 1 * *`
  - `@weekly`: once a week, `0 0 * * 0`
  - `@daily`: once a day, `0 0 * * *`
  - `@hourly`: once an hour, `0 * * * *`
- **Common Patterns:**
  - `0 8,20 * * *` — 8AM and 8PM every day
  - `0 0 1 * *` — First day of every month
- **Debugging:**
  - Double-check your time zone (cron jobs run in server time).
  - Use logging to verify execution.
  - For missed jobs, check if the server was running at the scheduled time.

## 5. Debugging Cron Jobs
- **Validate your expression** with online tools.
- **Check logs** for errors or missed runs.
- **Test with a short interval** (e.g., every minute) before using longer schedules.
- **Remember:** In this project, jobs are kept in memory and will be lost if the server restarts.

---

## 6. Using CronMailer
CronMailer lets you schedule emails using cron expressions via a simple web interface.

### Steps:
1. **Enter the recipient's email address.**
2. **Enter a cron schedule** (e.g., `0 9 * * *` for every day at 9:00 AM).
   - Need help? Use [crontab.guru](https://crontab.guru/).
3. **Click Schedule Email.**
4. You'll see a success or error message.

---

## 7. Project Setup

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

## 8. How CronMailer Works
- The frontend collects your email and cron schedule.
- The backend validates your input and schedules a job using `node-cron`.
- At the scheduled time, the backend sends an email using `nodemailer` and your SMTP credentials.
- **Note:** Jobs are kept in memory. For production, use a persistent scheduler or database.

---

## 9. Extending CronMailer
- **Custom Messages:** Add more fields to the form and API (see `src/types/index.ts`).
- **Persistence:** Integrate with a database or job queue (e.g., Bull, Agenda) to survive restarts.
- **One-off Jobs:** Adjust backend logic for single-run jobs.
- **More Actions:** Use cron jobs to trigger other automations, not just emails.

---

## 📝 Resources
- [crontab.guru](https://crontab.guru/) — Build/test cron expressions
- [Node-cron docs](https://www.npmjs.com/package/node-cron)
- [Nodemailer docs](https://nodemailer.com/about/)

---

## 🪪 License
MIT
