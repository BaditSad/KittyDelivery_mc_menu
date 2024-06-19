const express = require("express");
const router = express.Router();
module.exports = router;
const multer = require("multer"); 
const path = require("path");
const Menu = require("../models/menu");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "./storage")); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

router.get("/:restaurantId", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const menus = await Menu.find({ restaurant_id: req.params.restaurantId })
      .skip(skip)
      .limit(limit);

    const totalMenus = await Menu.countDocuments({
      restaurant_id: req.params.restaurantId,
    });
    
    if (!menus) {
      return res.status(404).json({ message: "Not found" });
    }

    if (menus.length === 0) {
      return res.status(201).json({ message: "Empty" });
    }

    res.status(201).json({
      totalPages: Math.ceil(totalMenus / limit),
      menus: menus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single('Menu_image'), async (req, res) => { 
  try {
    const { restaurant_id, menu_name, menu_description, menu_price, article_list } = req.body;
    const menu = await Menu.create({
      restaurant_id,
      menu_name,
      menu_description,
      menu_price,
      article_list,
      Menu_image: "/storage/" + req.file.filename 
    });
    await menu.save(); 

    res.status(201).json({ message: "Item posted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:menuId", upload.single('Menu_image'), async (req, res) => { 
  try {
    let updateData = {
      restaurant_id: req.body.restaurant_id,
      menu_name: req.body.menu_name,
      menu_description: req.body.menu_description,
      menu_price: req.body.menu_price,
      article_list: req.body.article_list,
    };

    if (req.file) {
      updateData.menu_image = "/storage/" + req.file.filename; 
    }

    const menu = await Menu.findByIdAndUpdate(req.params.menuId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!menu) {
      return res.status(404).json({ message: "Not found!" }); 
    }

    res.status(201).json({ message: "Item updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:menuId", async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.menuId);

    if (!menu) {
      return res.status(404).json({ message: "Not found!" });
    }

    res.status(201).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
