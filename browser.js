const puppeteer = require("puppeteer");

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: true,
      args: ["--no-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.error("Could not create a browser instance => :", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
