const express = require("express");
const router = express.Router();

const addToWatchlist = require("./add_to_watchlist");
router.use("/add", addToWatchlist);

const removeFromWatchlist = require("./remove_from_watchlist");
router.use("/remove", removeFromWatchlist);

const getWatchlist = require("./get_watchlist");
router.use("/get", getWatchlist);

module.exports = router;
