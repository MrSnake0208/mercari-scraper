const pageScraper = require("./pageScraper");
const data = require("./setting");

async function scrapeFromKeyword(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    console.log(data);
    await Promise.all(
      data.map(async (d) => await pageScraper.scraper(browser, d))
    );
    // await pageScraper.scraper(browser, keyword);
  } catch (err) {
    console.log("Could not resolve the browser instace => ", err);
  }
}

module.exports = (browserInstance) => scrapeFromKeyword(browserInstance);
