const browserObject = require("./browser");
const scraperController = require("./pageController");

async function search() {
  console.log("starting browser");
  let browserInstance = browserObject.startBrowser();

  scraperController(browserInstance);
}

// search();

const { sendNotification } = require("./mailer");

sendNotification("kserizawa081@gmail.com", "test", "test");
