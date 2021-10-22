const express = require("express");
const router = express.Router();

// adding
const addReview = require("./add_review");
router.use("/add", addReview);

// removing
const removeReview = require("./remove_review");
router.use("/remove", removeReview);

// editing
const editReview = require("./update_review");
router.use("/update", editReview);

module.exports = router;
