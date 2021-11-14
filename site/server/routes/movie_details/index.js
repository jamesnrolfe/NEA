const express = require("express");
const router = express.Router();

const updateMovieDetails = require("./update_movie_details");
router.use("/update", updateMovieDetails);

const initMovieDetails = require("./init_movie_details");
router.use("/init", initMovieDetails);

const getMovieDetails = require("./get_movie_details");
router.use("/get", getMovieDetails);

module.exports = router;
