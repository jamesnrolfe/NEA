const express = require("express");
const router = express.Router();

// adding
const addReview = require("./add_review");
router.use("/add", addReview);

// removing
const removeReview = require("./remove_review");
router.use("/remove", removeReview);

module.exports = router;
