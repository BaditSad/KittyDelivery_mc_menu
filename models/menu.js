var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const menuSchema = new Schema({
  restaurant_id: { type: Number, required: true },
  menu_name: { type: String, required: true },
  menu_description: { type: String, required: true },
  menu_price: { type: Number, required: true },
  article_list: { type: [String], required: true },
  Menu_image: { type: String, required: true } 

});

module.exports = mongoose.model("Menu", menuSchema);
