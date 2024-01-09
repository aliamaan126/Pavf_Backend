import nodemailer from 'nodemailer';

export const SMTPMailer = nodemailer.createTransport({
  host: 'mail.thekillcode.com',
  port: 465,
  secure: true,
  auth: {
    user: 'pavf@thekillcode.com',
    pass: 'PAVF123!@#',
  },
});
