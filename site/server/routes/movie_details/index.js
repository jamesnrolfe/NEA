const express = require("express");
const router = express.Router();

const updateMovieDetails = require("./update_movie_details");
router.use("/update", updateMovieDetails);

const initMovieDetails = require("./init_movie_details");
router.use("/init", initMovieDetails);

const getMovieDetails = require("./get_movie_details");
router.use("/get", getMovieDetails);

const getAllMovies = require("./get_all_movie_titles");
router.use("/get_all", getAllMovies);

module.exports = router;
