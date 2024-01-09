import {SMTPMailer } from '../utils/mailer.js';

export const sendMail = async (mailOptions, mailer) => {
  if (mailer == 'smtp') {
    const smtpInfo = await SMTPMailer.sendMail(mailOptions);
    return smtpInfo;
  }
};
