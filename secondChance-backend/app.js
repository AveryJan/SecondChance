const express = require("express");
const app = express();
const searchRoutes = require("./routes/searchRoutes");
const secondChanceItemsRoutes = require("./routes/secondChanceItemsRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(searchRoutes);
app.use(secondChanceItemsRoutes);
app.use(authRoutes);

app.get("/api/secondchance/search", (req, res) => {
  res.json({ message: "Search endpoint is active." });
});

module.exports = app;
