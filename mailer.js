const nodemailer = require("nodemailer");

async function sendNotification(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "mercari-notification",
      to,
      subject,
      text,
    });
    console.log(info);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { sendNotification };
