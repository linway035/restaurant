// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
// 引用  model
const Restaurant = require("../../models/restaurant");

// 首頁
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: "desc" })
    .then((restaurants) => {
      // restaurants這名稱hbs #each那要用。
      res.render("index", { restaurants });
    })
    .catch((error) => console.log("error!"));
});

// 匯出路由模組
module.exports = router;
