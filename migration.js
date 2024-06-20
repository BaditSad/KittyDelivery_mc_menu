var mongoose = require("mongoose");
var Menu = require("./models/menu");

var mongoDB = "mongodb://mongo:27017/kittydelivery";
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async function () {
  console.log(`🛠️Connection to MongoDB...`);

  try {
    await Menu.deleteMany({});
    console.log("Menus collection cleared");

    let menus = [
      {
        restaurant_id: 1,
        menu_name: "Menu du Jour",
        article_list: ["Burger", "Frites", "Soda"],
        menu_price: 18.0,
        menu_description: "Un menu du jour varié et équilibré",
      },
      {
        restaurant_id: 2,
        menu_name: "Menu Italien",
        article_list: ["Pâtes", "Tiramisu"],
        menu_price: 19.0,
        menu_description: "Un menu italien classique et savoureux",
      },
      {
        restaurant_id: 3,
        menu_name: "Menu Végétarien",
        article_list: ["Salade", "Soupe", "Smoothie"],
        menu_price: 16.0,
        menu_description: "Un menu végétarien sain et délicieux",
      },
      {
        restaurant_id: 1,
        menu_name: "Menu Enfant",
        article_list: ["Nuggets", "Frites", "Jus de fruits"],
        menu_price: 12.0,
        menu_description: "Un menu spécialement conçu pour les enfants",
      },
      {
        restaurant_id: 2,
        menu_name: "Menu Gourmet",
        article_list: ["Foie gras", "Filet mignon", "Crème brûlée"],
        menu_price: 45.0,
        menu_description:
          "Un menu haut de gamme pour les amateurs de cuisine raffinée",
      },
      {
        restaurant_id: 3,
        menu_name: "Menu Exotique",
        article_list: ["Sushi assortis", "Pad Thai", "Mochi glacé"],
        menu_price: 25.0,
        menu_description:
          "Un menu qui vous transporte dans des contrées lointaines",
      },
    ];

    await Menu.insertMany(menus);
    console.log("Menus inserted successfully");
  } catch (err) {
    console.error("Error inserting menus:", err);
  } finally {
    mongoose.connection.close();
  }
});
