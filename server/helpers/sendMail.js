import '@babel/polyfill';
import nodemailer from 'nodemailer';

const sendMail = async (name, email, position) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailspons.com",
    port: 587,
    secure: false, 
    auth: {
      user: '64df3262e765428780b80fdf266daafb',
      pass: 'fdcd986e70c842329747012132878660' 
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: '"Company Inc" <company@example.com>',
    to: `${email}`, 
    subject: "Admission ✔", 
    html: `<b>Dear ${name}</b> <p>We are to glad to inform you got the offer for the position of ${position} in Our company</p>`
  });
}

export default sendMail;