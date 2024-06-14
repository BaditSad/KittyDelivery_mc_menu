const express = require("express");
const router = express.Router();
module.exports = router;
const Menu = require("../models/menu");

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

router.post("/", async (req, res) => {
  try {
    const menu = new Menu(req.body);

    if (!menu) {
      return res.status(404).json({ message: "Not found" });
    }

    await menu.save();

    res.status(201).json({ message: "Item posted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:menuId", async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.menuId, req.body, {
      new: true,
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
