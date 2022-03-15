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

// getting
const getReviews = require("./get_reviews");
router.use("/get", getReviews);

// get single
const getReview = require("./get_review");
router.use("/get_single", getReview);

module.exports = router;
