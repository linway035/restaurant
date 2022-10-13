// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant.js"); //相對路徑

//搜尋餐廳
router.get("/", (req, res) => {
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

module.exports = router;
