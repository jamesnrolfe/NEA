const express = require("express");
const router = express.Router();

const addToWatchlist = require("./add_to_watchlist");
router.use("/add", addToWatchlist);

module.exports = router;
