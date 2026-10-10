const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

router.post("/api/secondchance/login", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, password } = req.body;

    const user = await db.collection("users").findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
});

router.post("/api/secondchance/register", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, email, password } = req.body;

    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const result = await db.collection("users").insertOne({ username, email, password });
    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Registration failed.", error: error.message });
  }
});

router.put("/api/secondchance/users/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, email, password } = req.body;

    const result = await db.collection("users").updateOne(
      { _id: req.params.id },
      { $set: { username, email, password } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "User update failed.", error: error.message });
  }
});

module.exports = router;
