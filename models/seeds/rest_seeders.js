//寫完記得要執行 node models/seeds/rest_seeders.js (須先create collection)
const mongoose = require("mongoose");
const Restaurant = require("../restaurant.js"); // 載入 todo model
const restaurantList = require("../../restaurant.json").results;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
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
