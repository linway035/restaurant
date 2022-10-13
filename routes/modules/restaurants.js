// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant.js"); //相對路徑

//新增清單的get&post
router.get("/create_new", (req, res) => {
  return res.render("new");
});
router.post("/", (req, res) => {
  // console.log(req.body);
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log("create error!"));
});

// //瀏覽特定餐廳
router.get("/:restaurant_id", (req, res) => {
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
router.get("/:restaurant_id/edit", (req, res) => {
  const restaurantID = req.params.restaurant_id;
  return Restaurant.findById(restaurantID)
    .lean()
    .then((restaurantItem) => res.render("edit", { restaurantItem }))
    .catch((error) => console.log("edit error!"));
});
router.put("/:restaurant_id", (req, res) => {
  const restaurantID = req.params.restaurant_id;
  console.log(restaurantID);
  return Restaurant.findByIdAndUpdate(restaurantID, req.body)
    .lean()
    .then(() => res.redirect(`/restaurants/${restaurantID}`))
    .catch((error) => console.log("edit error!"));
});

//刪除項目
router.delete("/:restaurant_id", (req, res) => {
  const restaurantID = req.params.restaurant_id;
  Restaurant.findById(restaurantID)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;