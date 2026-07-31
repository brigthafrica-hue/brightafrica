import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  // Use a real SMTP server in production
  // For development, you can use Ethereal Email (https://ethereal.email)
  
  /*
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@brightafrica.org',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
  */
  
  console.log(`[Mock Email] Sent to ${options.to} - Subject: ${options.subject}`);
};
