require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./src/config/database");
const authRoutes = require("./src/routes/auth");
const linkRoutes = require("./src/routes/links");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/links", linkRoutes);

// Redirect route
const rateLimit = require("./src/middlewares/rateLimit");
app.get("/:code", rateLimit.redirectRateLimit, async (req, res) => {
  // This will be implemented in linkController
  const linkController = require("./src/controller/linkController");
  await linkController.redirect(req, res);
});

app.get('/', (req, res) => {
  res.send('Success');
});

// Database sync
db.sequelize.sync().then(() => {
  console.log("Database synced");
}).catch((err) => {
  console.error("Error syncing database:", err);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running on ${process.env.PORT || 3000}`);
});

