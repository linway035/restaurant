const express = require("express");
const app = express();
const port = 3000;
// require express-handlebars here
const exphbs = require("express-handlebars"); //沒給路徑，則判斷去node_modules裡面找
const restaurantList = require("./restaurant.json"); //相對路徑，與app同階
// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting static files靜態檔案
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  // restaurants這名稱hbs #each那要用。
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (item) => item.id.toString() === req.params.restaurant_id
  );
  // restaurantItem，show.hbs 那要用
  res.render("show", { restaurantItem: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim(); //.keyword這名稱來自form的input name
  const filterRestaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword)
    );
  });
  //index.hbs要用，keyword保留住，不清空搜尋欄
  res.render("index", { restaurants: filterRestaurants, keywords: keyword });
});

app.listen(port, () => {
  console.log("okokokok");
});
