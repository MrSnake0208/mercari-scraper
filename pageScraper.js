const fs = require("fs");
const scraperObject = {
  baseUrl: "https://jp.mercari.com/search?keyword=",
  async scraper(browser, keyword) {
    let page = await browser.newPage();
    const targetUrl = this.baseUrl + keyword;
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl);
    await page.waitForSelector("#item-grid");
    const info = await page.$$eval("mer-item-thumbnail", (items) => {
      const info = items.map((el) => {
        return {
          price: el.getAttribute("price"),
          name: el.getAttribute("alt"),
        };
      });
      return info;
    });

    const min = 10000;
    const max = 60000;

    const latestItems = info.filter(
      (item) => min < item.price && item.price < max
    );

    const json = JSON.stringify(latestItems);
    fs.writeFile("last.json", json, "utf-8", (err) => {
      console.error(err);
    });

    const oldItems = JSON.parse(fs.readFileSync("./last.json", "utf-8"));

    const newItems = findUpdatedOrNewItems(latestItems, oldItems);

    console.log("newItems", newItems);
  },
};

function findUpdatedOrNewItems(latestItems, oldItems) {
  const newItems = [];
  latestItems.forEach((item) => {
    if (
      oldItems.filter(
        (oldItem) => oldItem.price === item.price && oldItem.name === item.name
      ).length === 0
    ) {
      newItems.push(item);
    }
  });
  return newItems;
}

module.exports = scraperObject;
