const pageScraper = require("./pageScraper");
async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    await pageScraper.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instace => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
