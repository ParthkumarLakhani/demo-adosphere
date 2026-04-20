const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const validation = require("../middlewares/validation");

// POST /auth/login
router.post("/login", validation.validateLogin, authController.login);

module.exports = router;