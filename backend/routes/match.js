const express = require("express");
const { getMatches } = require("../controllers/matchController.js");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:userId", authMiddleware, getMatches);

module.exports = router; 