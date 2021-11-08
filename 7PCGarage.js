//login to the login page site
//check with regex if i'm logged in
//go to order history
//scrape "comanda, valoare, etc" and store to an array of ojects
//download the invoice as a pdf, using requests(xhr)

const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const { click } = require("nightmare/lib/actions");
const nightmare = Nightmare({ show: true, width: 1300, height: 900 });

const match = /Sergiu/g;

// async function PcGarage() {
//   async function navigate() {
//     await nightmare
//       .goto("https://auth.emag.ro/user/login")
//       .wait("#user_login_email")
//       .type("#user_login_email", "diablo201888@gmail.com")
//       .click("#user_login_continue")
//       .wait(20000)
//       .wait("#user_login_password")
//       .type("#user_login_password", "Test2018")
//       .click("#user_login_continue")
//       .wait(20000);
//   }

//   const body = nightmare.evaluate(() => document.body.innerHTML);
//   const $ = cheerio.load(body);

//   const checkAccount = $(".panel-body:first")
//     .map((index, elem) => {
//       const logout = $(elem).find(".field-value:first").text().trim();

//       const checkName = () => {
//         return match.test(logout)
//           ? console.log("is logged in")
//           : console.log("is logged out");
//       };
//       checkName();
//       return {
//         logout,
//       };
//     })
//     .toArray();
//   console.log(checkAccount);
// }

async function navigate() {
  await nightmare
    .goto("https://auth.emag.ro/user/login")
    .wait("#user_login_email")
    .type("#user_login_email", "diablo201888@gmail.com")
    .click("#user_login_continue")
    .wait(20000)
    .wait("#user_login_password")
    .type("#user_login_password", "Test2018")
    .click("#user_login_continue")
    .wait(20000)
    .catch((end) => {
      console.log(end);
    });

  function target() {
    const body = nightmare.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);

    const checkAccount = $(".panel-body:first")
      .map((index, elem) => {
        const logout = $(elem).find(".field-value:first").text().trim();

        const checkName = () => {
          return match.test(logout)
            ? console.log("is logged in")
            : console.log("is logged out");
        };
        checkName();
        return {
          logout,
        };
      })
      .toArray();
  }

  target();
}

navigate();
