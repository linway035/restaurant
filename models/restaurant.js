//定義 資料結構 Schema，確保每一筆資料長相
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  // id: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: String, // String is shorthand for {type: String}
});
module.exports = mongoose.model("Restaurant", restaurantSchema);
