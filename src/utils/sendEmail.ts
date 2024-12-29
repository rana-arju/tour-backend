import nodemailer from 'nodemailer'
import config from '../config'
const sendEmail = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: process.env.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  })
  await transporter.sendMail({
    from: config.email_user,
    to: email,
    subject: 'Reset your password withing 10 minutes', // Subject line
    text: '',
    html,
  })
}

export default sendEmail
