const express = require("express");
const app = express();
const port = 3000;
// require express-handlebars here
const exphbs = require("express-handlebars"); //沒給路徑，則判斷去node_modules裡面找
const Restaurant = require("./models/restaurant.js"); //相對路徑，與app同階
app.use(express.urlencoded({ extended: true })); // setting body-parser
// 載入 method-override
const methodOverride = require("method-override");
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method"));

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

//新增清單的get&post
app.get("/restaurants/create_new", (req, res) => {
  return res.render("new");
});
app.post("/restaurants", (req, res) => {
  // console.log(req.body);
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log("create error!"));
});

// //瀏覽特定餐廳
app.get("/restaurants/:restaurant_id", (req, res) => {
  // console.log(req);
  const restaurantID = req.params.restaurant_id;
  // console.log(restaurantID);
  return Restaurant.findById(restaurantID)
    .lean()
    .then((restaurantItem) => {
      res.render("show", { restaurantItem });
    })
    .catch((error) => console.log("show error!"));
});

//修改清單餐廳get&put (code幾乎同瀏覽段)
app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const restaurantID = req.params.restaurant_id;
  return Restaurant.findById(restaurantID)
    .lean()
    .then((restaurantItem) => res.render("edit", { restaurantItem }))
    .catch((error) => console.log("edit error!"));
});
app.put("/restaurants/:restaurant_id", (req, res) => {
  const restaurantID = req.params.restaurant_id;
  console.log(restaurantID);
  return Restaurant.findByIdAndUpdate(restaurantID, req.body)
    .lean()
    .then(() => res.redirect(`/restaurants/${restaurantID}`))
    .catch((error) => console.log("edit error!"));
});

//刪除項目
app.delete("/restaurants/:restaurant_id", (req, res) => {
  const restaurantID = req.params.restaurant_id;
  Restaurant.findById(restaurantID)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//搜尋餐廳
app.get("/search", (req, res) => {
  const keywordOriginal = req.query.keyword; //.keyword這名稱來自form的input name
  const keyword = req.query.keyword.trim().toLowerCase();
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      );
      res.render("index", {
        restaurants: filterRestaurants,
        keywords: keywordOriginal, //keywords這名稱來自form的input value
      });
    })
    .catch((error) => console.log(error));
});

// listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
