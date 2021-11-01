const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const { click, evaluate } = require('nightmare/lib/actions');
const { type } = require('os');
const nightmare = Nightmare({ show: true,width: 1200, height: 900})

 async function navigateToHomePage() {
   await nightmare
    .goto('https://pcgarage.ro/')
    .type('#searchac', 'gaming mouse')
    .click('#sf2')
    .wait(20000);

    const body = await nightmare. evaluate(() => document.body.innerHTML)
    const $ = cheerio.load(body)
    
    const mouses = $('.product_box').map((index, elem) => {
        const title = $(elem).find('.my-0').text();
        const link = $(elem).find(".my-0 a").attr('href')
        const price = $(elem).find(".price").text();
        const sells = $(elem).find('.prefs_sort').text().trim()

        return {
            title,
            link,
            price,
            sells
        }
    }).toArray()

    console.log(mouses)
}

navigateToHomePage()
