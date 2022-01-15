const browserObject = require("./browser");
const scraperController = require("./pageController");

const readline = require("readline");

async function getKeyword() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return "アーロンチェア";
  // return new Promise((resolve, reject) => {
  //   rl.question("What do you want to search: ", function (answer) {
  //     resolve(answer);
  //     rl.close();
  //   });
  // });
}

async function search() {
  const keyword = await getKeyword();
  console.log("starting browser");
  let browserInstance = browserObject.startBrowser();
  scraperController(browserInstance, keyword);
}

search();
