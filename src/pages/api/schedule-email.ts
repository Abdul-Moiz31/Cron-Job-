import type { NextApiRequest, NextApiResponse } from 'next';
import cron from 'node-cron';
import nodemailer from 'nodemailer';

interface EmailSchedule {
  email: string;
  schedule: string;
}

let scheduledJobs: { [key: string]: cron.ScheduledTask } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, schedule }: EmailSchedule = req.body;

    if (!email || !schedule) {
      return res.status(400).json({ message: 'Email and schedule are required' });
    }

    if (!cron.validate(schedule)) {
      return res.status(400).json({ message: 'Invalid cron expression' });
    }

    // Setup your transporter with your real credentials or environment variables
    // It's recommended to use environment variables for sensitive data
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.your-email.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'your@email.com',
        pass: process.env.SMTP_PASS || 'your-email-password',
      },
    });

    const job = cron.schedule(schedule, async () => {
      try {
        console.log(`Sending promotional email to ${email}`);
        await transporter.sendMail({
          from: `"Your Name" <${process.env.SMTP_USER || 'your@email.com'}>`,
          to: email,
          subject: 'Promotion!',
          text: 'This is your scheduled promotional email.',
        });
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    });

    scheduledJobs[email] = job;
    res.status(200).json({ message: 'Email scheduled successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}