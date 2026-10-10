const express = require("express");
const path = require("path");
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");
const secondChanceItemsRoutes = require("./routes/secondChanceItemsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/secondchance", searchRoutes);
app.use("/api/secondchance", secondChanceItemsRoutes);
app.use("/api/secondchance", authRoutes);

app.get("/api/secondchance/search", (req, res) => {
  const { category, q } = req.query;
  const results = [
    { _id: "1", name: "Desk Lamp", category: "Furniture", description: "A working desk lamp" },
    { _id: "2", name: "School Backpack", category: "School Supplies", description: "Blue backpack" }
  ];

  let filtered = results;
  if (category) {
    filtered = filtered.filter(item => item.category.toLowerCase() === String(category).toLowerCase());
  }
  if (q) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(String(q).toLowerCase()));
  }

  res.json(filtered);
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "landing.html"));
});

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "main.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

app.get("/item", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "item.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "search.html"));
});

module.exports = app;
