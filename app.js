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
const routes = require("./routes"); //預設會去找index.js(總路由器)
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
