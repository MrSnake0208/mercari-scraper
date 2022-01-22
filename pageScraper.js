const fs = require("fs");
const { sendNotification } = require("./mailer");

const scraperObject = {
  baseUrl: "https://jp.mercari.com/search?keyword=",
  async scraper(browser, data) {
    const keyword = data.keyword;
    const max = data.maxPrice;
    const min = data.minPrice;
    const to = data.emailTo;
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

    const latestItems = info.filter(
      (item) =>
        min < item.price && item.price < max && item.name.includes(keyword)
    );

    const json = JSON.stringify(latestItems);

    let oldItems = [];
    try {
      oldItems = JSON.parse(fs.readFileSync(`last${keyword}.json`, "utf-8"));
    } catch (e) {
      console.error(e);
    }

    fs.writeFile(`last${keyword}.json`, json, "utf-8", (err) => {
      console.error(err);
    });

    const newItems = findUpdatedOrNewItems(latestItems, oldItems);

    if (!!newItems.length) {
      await sendNotification(
        to,
        `new ${keyword} was found with ${newItems[0].price} yen`,
        `link: ${targetUrl}`
      );
    }
    console.log("newItems", newItems);
    return newItems;
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
