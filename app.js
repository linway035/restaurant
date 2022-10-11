const express = require("express");
const app = express();
const port = 3000;
// require express-handlebars here
const exphbs = require("express-handlebars"); //沒給路徑，則判斷去node_modules裡面找
const Restaurant = require("./models/restaurant.js"); //相對路徑，與app同階
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose"); // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, {
  // 設定連線到 mongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting static files靜態檔案
app.use(express.static("public"));

// 首頁
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      // restaurants這名稱hbs #each那要用。
      res.render("index", { restaurants });
    })
    .catch((error) => console.log("error!"));
});

// //瀏覽特定餐廳
// app.get("/restaurants/:restaurant_id", (req, res) => {
//   const restaurant = restaurantList.results.find(
//     (item) => item.id.toString() === req.params.restaurant_id
//   );
//   // restaurantItem，show.hbs 那要用
//   res.render("show", { restaurantItem: restaurant });
// });

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim(); //.keyword這名稱來自form的input name
  const filterRestaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  //index.hbs要用，keyword保留住，不清空搜尋欄
  res.render("index", { restaurants: filterRestaurants, keywords: keyword });
});

//新增清單的get&post
app.get("/restaurants/create_new", (req, res) => {
  return res.render("new");
});
app.post("/restaurants", (req, res) => {
  console.log(req.body);
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log("create error!"));
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
