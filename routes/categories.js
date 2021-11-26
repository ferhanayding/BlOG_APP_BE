const router = require("express").Router();
const Post = require("../model/Post");
const Category = require("../model/Category");
const User = require("../model/User");
// new categories ----------------------------
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get --------------------------------
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
