const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

router.get("/search", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category, q } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (q) {
      filter.name = { $regex: q, $options: "i" };
    }

    const results = await db.collection("items").find(filter).toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Search failed.", error: error.message });
  }
});

module.exports = router;
