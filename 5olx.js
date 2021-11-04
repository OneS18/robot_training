const cheerio = require("cheerio");

const getData = () => {
  const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", " https://www.olx.ro/ajax/suggest/get/?q=casa&q=casa");

  xhr.onload = () => {
    const data = xhr.responseText;

    let $ = cheerio.load(data);
    let array = [];
    let homes = $("li").text().replace(/\s\s+/g, "").trim();
    array.push(homes);

    console.log(array);
  };
  xhr.send();
};

getData();
