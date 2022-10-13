// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant.js"); //相對路徑
const sortContent = require("../../utilities/sortContent");

//搜尋餐廳
router.get("/", (req, res) => {
  const keywordOriginal = req.query.keyword; //.keyword這名稱來自form的input name
  const keyword = req.query.keyword.trim().toLowerCase();
  // console.log(req.query);
  const sortValue = {
    sortZero: req.query.sort === "0",
    sortOne: req.query.sort === "1",
    sortTwo: req.query.sort === "2",
    sortThree: req.query.sort === "3",
    sortFour: req.query.sort === "4",
    sortFive: req.query.sort === "5",
    sortSix: req.query.sort === "6",
  };
  Restaurant.find()
    .lean()
    .sort(sortContent(req.query.sort))
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      );
      res.render("index", {
        restaurants: filterRestaurants,
        keywords: keywordOriginal, //keywords這名稱來自form的input value
        sortValue: sortValue,
      });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
