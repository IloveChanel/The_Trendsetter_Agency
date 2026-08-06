import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendAllLinkWelcomeEmail(to: string, downloadUrl: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Welcome to AllLink – Your Download Is Ready',
    html: 
      <h2>Welcome to AllLink</h2>
      <p>Thanks for subscribing. Your dashboard is ready to download.</p>
      <p><a href="\">Download AllLink Dashboard</a></p>
      <p>This link is valid for 24 hours.</p>
      <p>— The Trendsetter Agency</p>
    ,
  });
}
