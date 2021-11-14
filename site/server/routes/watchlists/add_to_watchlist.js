const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const movieId = req.body.movie_id;
	const userId = req.body.user_id; // we need both user id and movie id

	const sql = "INSERT INTO user_watchlists (user_id, movie_id) VALUES (?,?)";

	con.query(sql, [movieId, userId], (err, result) => {
		if (err) throw err;
		res.send(
			`Successfully added movie with id: ${movieId} to the watchlist of user with id: ${userId}`
		); // return a success message if no error
	});
});

module.exports = router;
