const cheerio = require("cheerio");
const { toArray } = require("cheerio/lib/api/traversing");
const { trim } = require("lodash");
const Nightmare = require("nightmare");
const { click, wait } = require("nightmare/lib/actions");
const nightmare = Nightmare({ show: true, width: 1200, height: 1200 });

async function menu() {
  await nightmare.goto("http://www.meniulzilei.info/targu-mures").wait(2000);

  const body = await nightmare.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(body);

  const meniulZilei = $(".box")
    .map((index, elem) => {
      const restaurantName = $(elem).find(".title").text();
      const menuList = $(elem).find(".boxContent ul li").text();
      const price = $(elem).find(".priceBadge").text().trim();
      const phoneNumber = $(elem).find("td span").text();
      const delivery = $(elem).find("td sup").text();

      const isDelivery = () => {
        if (!delivery.length) {
          console.log("there is no delivery");
        }
      };

      return {
        restaurantName,
        menuList,
        price,
        phoneNumber,
        isDelivery()
      };
    })
    .toArray();

  console.log(meniulZilei);
}

menu();
