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

    const newItems = info.filter(
      (item) => min < item.price && item.price < max
    );

    const lastItems = JSON.parse(fs.readFileSync("./last.json", "utf-8"));

    const d = diff(newItems, lastItems);
    // .map(
    //   (obj) => Object.key(obj).length !== 0
    // );

    const addedItems = [];

    for (const [key, value] of Object.entries(d)) {
      console.log({
        key,
        value,
      });
      if (Object.keys[key]?.length === 0) {
        const o = {};
        o[key] = value;
        addedItems.push(o);
      }
    }

    const json = JSON.stringify(newItems);
    fs.writeFile("last.json", json, "utf-8", () => {
      console.log("addedItems", addedItems);
      console.log(d);
    });
  },
};

function diff(obj1, obj2) {
  var result = {};
  for (key in obj1) {
    if (obj2[key] != obj1[key]) result[key] = obj2[key];
    if (typeof obj2[key] == "array" && typeof obj1[key] == "array")
      result[key] = arguments.callee(obj1[key], obj2[key]);
    if (typeof obj2[key] == "object" && typeof obj1[key] == "object")
      result[key] = arguments.callee(obj1[key], obj2[key]);
  }
  return result;
}

module.exports = scraperObject;
