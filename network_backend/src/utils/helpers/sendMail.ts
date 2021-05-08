import nodemailer from 'nodemailer';

interface SendEmail {
  email: string;
  subject: string;
  text?: string;
  html?: string;
}

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

    // console.log('transport', transporter);

    await transporter.sendMail({
      from: `"SocialCampus" <${process.env.EMAIL_USER}>`, // sender address
      to: email, // to.join(),
      subject: subject, // Subject line
      text: text, // plain text body
      html: html,
    });

    console.log('⚠️  Sent Email to: %s', email);
    // Preview only available when sending through an Ethereal account
  } catch (err) {
    console.log(err);
  }
}
