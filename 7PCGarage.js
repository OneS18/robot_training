//login to the login page site
//check with regex if i'm logged in
//go to order history
//scrape "comanda, valoare, etc" and store to an array of ojects
//download the invoice as a pdf, using requests(xhr)

const cheerio = require("cheerio");
const { compareDocumentPosition } = require("domutils");
const Nightmare = require("nightmare");
const { click, wait } = require("nightmare/lib/actions");
const nightmare = Nightmare({ show: true, width: 1300, height: 900 });

const match = /Sergiu/g;
const info = [];

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
    // .click(".full-white-button");

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
    info.push(scrapeOrders);
  }
  history();

  async function downloadInfo() {
    
  }
}

PcGarage();
