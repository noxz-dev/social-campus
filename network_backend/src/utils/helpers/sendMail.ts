import nodemailer from 'nodemailer';
import { log } from '../../utils/services/logger';

interface SendEmail {
  email: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Sends Mails
 */
export async function sendEmail({ email, subject, text, html }: SendEmail): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SocialCampus" <${process.env.EMAIL_USER}>`, // sender address
      to: email, // to.join(),
      subject: subject, // Subject line
      text: text, // plain text body
      html: html,
    });

    log.info('⚠️  Sent Email to: %s', email);
  } catch (err) {
    log.error(err);
  }
}
