const express = require("express");

const router = express.Router();

const {
  getPair,
  vote
} = require("../controllers/comparisonController");

router.get("/pair", getPair);

router.post("/vote", vote);

module.exports = router;