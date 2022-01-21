const nodemailer = require("nodemailer");

async function sendNotification(to, subject, text) {
  try {
    console.log("process.env.EMAIL", process.env.EMAIL);
    console.log("process.env.PASSWORD", process.env.PASSWORD);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    console.log(transporter);
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
