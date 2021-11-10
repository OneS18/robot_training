const cheerio = require("cheerio");
const { jsPDF } = require("jspdf");
const { compareDocumentPosition } = require("domutils");
const Nightmare = require("nightmare");
const { click, wait } = require("nightmare/lib/actions");
const axios = require("axios");
const nightmare = Nightmare({ show: true, width: 1300, height: 900 });
const screenshotSelector = require("nightmare-screenshot-selector");
const fs = require("fs");

const match = /Sergiu/g;
const info = [];
const doc = new jsPDF();

async function PcGarage() {
  await nightmare
    .goto("https://auth.emag.ro/user/login")
    .wait("#user_login_email")
    .type("#user_login_email", "diablo201888@gmail.com")
    .click("#user_login_continue")
    .wait(20000)
    .wait("#user_login_password")
    .type("#user_login_password", "Test2018")
    .click("#user_login_continue")
    .wait(25000);

  const body = await nightmare.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(body);

  const checkAccount = $(".panel-body:first")
    .map((index, elem) => {
      const user = $(elem).find(".field-value:first").text();

      const checkName = () => {
        return match.test(user)
          ? console.log("is logged in")
          : console.log("is logged out");
      };
      checkName();
      return {
        user,
      };
    })
    .toArray();
  console.log(checkAccount);

  async function history() {
    await nightmare
      .goto("https://www.emag.ro/history/shopping?ref=ua_order_history")
      .wait(10000);

    const body = await nightmare.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);

    const scrapeOrders = $(".order-hist-box")
      .map((index, elem) => {
        const nrComanda = $(elem).find(".gtm_6x2itw").text().trim();
        const dataTime = $(elem).find(".order-date").text().trim();
        const valoare = $(elem).find(".money-int").text().trim();
        const link = $(elem).find(".order-head.clearfix > a").attr("href");

        return {
          nrComanda,
          dataTime,
          valoare,
          link,
        };
      })
      .toArray();
    console.log(scrapeOrders);
    const infoPDF = info.push(scrapeOrders);

    console.log(info);

    async function factura() {
      await nightmare
        .click(
          "#emg-body-overlay > div.main-container-inner > div.emg-container > div > div.user-account-content.page-container > div > div > ul > li:nth-child(3) > div.order-head.clearfix > a"
        )
        .wait(2000);
      const body = await nightmare.evaluate(() => document.body.innerHTML);
      const $ = cheerio.load(body);

      const orderList = $(".order-details-box.last").map((index, elem) => {
        const isFactura = $(elem)
          .find(".full-white-button.full-width-spread")
          .text();

        if (isFactura.length) {
          goToFactura();
          console.log("exists");
        } else {
          makeScreenshot();
          console.log("not exists");
        }
        console.log(isFactura);
        return isFactura;
      });
    }
    factura();
  }
  history();
}

PcGarage();

async function goToFactura() {
  await nightmare.click(".full-white-button.full-width-spread").wait(2000);
}

async function makeScreenshot() {
  await nightmare
    .click(".full-white-button.full-width-spread")
    .wait(2000)
    .screenshotSelector(".account_holder")
    .then(function (data) {
      fs.writeFileSync("screen.png", data);
    });
}
