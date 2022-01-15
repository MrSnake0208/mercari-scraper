const sendmail = require("sendmail")();

async function sendNotification(to, subject, text) {
  sendmail(
    {
      from: "no-reply@mercari-scraper",
      to,
      subject,
      html: text,
    },
    function (err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
    }
  );
}

module.exports = { sendNotification };
