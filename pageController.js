const pageScraper = require("./pageScraper");
async function scrapeFromKeyword(browserInstance, keyword) {
  let browser;
  try {
    browser = await browserInstance;
    await pageScraper.scraper(browser, keyword);
  } catch (err) {
    console.log("Could not resolve the browser instace => ", err);
  }
}

module.exports = (browserInstance, keyword) =>
  scrapeFromKeyword(browserInstance, keyword);
