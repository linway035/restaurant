//寫完記得要執行 node models/seeds/rest_seeders.js (須先create collection)
const Restaurant = require("../restaurant.js"); // 載入 restaurant model
const restaurantList = require("../../restaurant.json").results;
const db = require("../../config/mongoose");

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

// console.log(process.env.MONGODB_URI);
