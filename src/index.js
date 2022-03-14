require("dotenv").config();
const browserObject = require("./browser");
const scraperController = require("./pageController");

async function search() {
  console.log("starting browser");
  let browserInstance = browserObject.startBrowser();

  await scraperController(browserInstance);
  process.exit();
}

search();
