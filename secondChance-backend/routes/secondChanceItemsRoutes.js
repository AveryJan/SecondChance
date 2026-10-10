const express = require("express");
const multer = require("multer");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

const upload = multer({ dest: "uploads/" });

router.get("/api/secondchance/items", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection("items").find({}).toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch items.", error: error.message });
  }
});

router.get("/api/secondchance/items/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const item = await db.collection("items").findOne({ _id: req.params.id });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch item.", error: error.message });
  }
});

router.post("/api/secondchance/items", upload.single("image"), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const item = {
      ...req.body,
      image: req.file ? req.file.filename : null,
      createdAt: new Date()
    };

    const result = await db.collection("items").insertOne(item);
    res.status(201).json({ message: "Item created successfully", itemId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Unable to create item.", error: error.message });
  }
});

router.delete("/api/secondchance/items/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("items").deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete item.", error: error.message });
  }
});

module.exports = router;
