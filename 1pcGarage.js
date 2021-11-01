const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true,width: 1200, height: 900})

nightmare
  .goto(' https://pcgarage.ro/')
  .type('#searchac', 'gaming mouse')
  .click('#sf2')
  .wait(20000)
  .evaluate(() => {
       let allInfo = []
       const data = document.querySelectorAll("#wrapper_listing_products > div:nth-child(1) > div > div.product_box > div.product_box_middle > div.product_box_name > h2 > a").text;
       allInfo = data
       return allInfo
    })
  .end()
  .then((title) => {
        console.log(title)
  })
  .catch(error => {
    console.error('Search failed:', error)
  })
