var mongoose = require("mongoose");
var Menu = require("./models/menu");

var mongoDB = "mongodb://mongo:27017/kittydelivery";
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async function () {
  console.log("Connected to MongoDB");

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
      {
        restaurant_id: 1,
        menu_name: "barquette de frite",
        menu_description: "barquette de frite",
        menu_price: 5,
        article_list: [ "barquette de frite" ],
        Menu_image: "/storage/1718575365084-.png",
      },
      {
        restaurant_id: 1,
        menu_name: "MMenu BIGMAC",
        menu_description: "sauce mayo",
        menu_price: 12,
        article_list: ["Burger + Frite"
        ],
        Menu_image: "/storage/1718575740481-.png",
      },
      {

        restaurant_id: 1,
        menu_name: "pizza",
        menu_description: "pizza + barquette",
        menu_price: 12,
        article_list: [ "pizza , barquette"  ],
        Menu_image: "/storage/1718625353079-.jpg",
      },
      {
        restaurant_id: 1,
        menu_name: "kwdckw",
        menu_description: "hkbhkbhk",
        menu_price: 77,
        article_list: [
          "hvkvkh"
        ],
        Menu_image: "/storage/1718626028592-.jpg",
      },
      {
        restaurant_id: 1,
        menu_name: "qdkqw kd",
        menu_description: "nk kjijn",
        menu_price: 12,
        article_list: [
          "hbhubuhb"
        ],
        Menu_image: "/storage/1718628578094-.png",
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
