const express = require("express");
const router = express.Router();
module.exports = router;
const Menu = require("../models/menu");

router.get("/:restaurantId", async (req, res) => {
  try {
    const menus = await Menu.find({ restaurant_id: req.params.restaurantId });
    if (!menus) {
      return res.status(404).json({ message: "Menus not found!" });
    }
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const menu = new Menu(req.body);
    if (!menu) {
      return res.status(404).json({ message: "Error while adding menu!" });
    }
    await menu.save();
    res.status(201).json(menu);
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
      return res.status(404).json({ message: "Menu not found!" });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:menuId", async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!" });
    }
    res.json({ message: "Menu deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
