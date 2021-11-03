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
      const menuList = $(elem)
        .find(".boxContent ul li")
        .map((_index, _elem) => {
          return $(_elem).text();
        })
        .toArray();
      const price = $(elem).find(".priceBadge").text().trim();
      let phoneNumber = $(elem).find("td span[title]").text();
      let delivery = $(elem).find("td sup");

      let phoneNumbers = [];
      if (!phoneNumber.length) {
        phoneNumbers = "no phone number";
      } else {
        const regex = /\d+\s-\s\d+\s\d+/g;
        phoneNumbers = phoneNumber.match(regex);
      }

      delivery = delivery.length ? true : false;

      return {
        restaurantName,
        menuList,
        price,
        phoneNumbers,
        delivery,
      };
    })
    .toArray();

  console.log(meniulZilei);
}

menu();

