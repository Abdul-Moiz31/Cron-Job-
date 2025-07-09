export interface EmailSchedule {
    recipient: string;
    subject: string;
    message: string;
    scheduleTime: string; // Cron format
}