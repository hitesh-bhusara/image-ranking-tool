const express = require("express");

const router = express.Router();

const {
  leaderboard
} = require("../controllers/ratingController");

router.get("/leaderboard", leaderboard);

module.exports = router;