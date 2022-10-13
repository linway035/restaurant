const express = require("express");
const app = express();
const port = 3000;
// require express-handlebars here
const exphbs = require("express-handlebars"); //沒給路徑，則判斷去node_modules裡面找

app.use(express.urlencoded({ extended: true })); // setting body-parser
// 載入 method-override
const methodOverride = require("method-override");
// 設定每一筆請求都會透過 methodOverride 進行前置處理，參數_method
app.use(methodOverride("_method"));

// 引用路由器
const routes = require("./routes"); //預設會去找index.js
// 將 request 導入路由器
app.use(routes);

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
