const express = require("express");
const exphbs = require("express-handlebars"); //沒給路徑，則判斷去node_modules裡面找
const app = express();
const port = 3000;

// const Restaurant = require("./models/restaurant.js"); //相對路徑，與app同階

// setting body-parser
app.use(express.urlencoded({ extended: true }));

// 載入 method-override
const methodOverride = require("method-override");
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method"));

// 引用路由器
const routes = require("./routes");
// 將 request 導入路由器
app.use(routes);

require("./config/mongoose");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting static files靜態檔案
app.use(express.static("public"));

// listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
