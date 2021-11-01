const cheerio = require('cheerio');
const { toArray } = require('cheerio/lib/api/traversing');
const Nightmare = require('nightmare')
const { click, wait } = require('nightmare/lib/actions')
const nightmare = Nightmare({ show: true,width: 1200, height: 900})

async function firstCar() {
    await nightmare
    .goto('https://www.autoscout24.ro')
    .click('.search-mask-refine-link')
    .wait(3000)
    .click('.sc-grid-col-6')
    .wait(3000)
    .click('#country-input-suggestion-2')
    .wait(1500)
    .click(".css-1xfaiyg")
    .wait(3000)



    const body = await nightmare. evaluate(() => document.body.innerHTML)
    const $ = cheerio.load(body)

    const car = $('.css-qdkdg').map((index, elem) => {
      const title = $(elem).find('.css-4u347z').text()
      const mileage = $(elem).find('.css-147zjea').text()
      const engineSize = $(elem).find('.css-h81uhl').text()
      const price = $(elem).find('.css-113e8xo').text()
      const year = $(elem).find('.css-147zjea').text()

      return {
          title,
          mileage,
          engineSize,
          price,
          year  
      }
    }).toArray()

      console.log(car)
}

firstCar()