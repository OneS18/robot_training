const titles = $(".title-and-badge")
  .map((index, elem) => {
    const title = $(elem).find("#video-title").text().trim();
    return title;
  })
  .toArray();

const filtering = titles.filter((word) => !word.includes("Dani Mocanu"));
console.log(filtering);
