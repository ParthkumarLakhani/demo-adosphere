const express = require("express");
const router = express.Router();
const linkController = require("../controller/linkController");
const guard = require("../guard/guard");
const validation = require("../middlewares/validation");

// POST /links (auth required)
router.post("/", guard.authValidation, validation.validateCreateLink, linkController.createLink);

// GET /links/my (auth required)
router.get("/my", guard.authValidation, linkController.getMyLinks);

module.exports = router;