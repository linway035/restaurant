//寫完記得要執行 node models/seeds/rest_seeders.js (須先create collection)
const db = require("../../config/mongoose");
const Restaurant = require("../restaurant.js"); // 載入 todo model
const restaurantList = require("../../restaurant.json").results;

db.once("open", () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantList is done!");
      db.close();
    })
    .catch((error) => {
      console.log(error);
    });
});
