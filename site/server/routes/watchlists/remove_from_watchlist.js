const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const movieId = req.body.movie_id;
	const userId = req.body.user_id; // we need these two parameters to have enough information
	// to remove one

	const sql = "DELETE FROM user_watchlists WHERE user_id = ? AND movie_id = ?";

	con.query(sql, [userId, movieId], (err, result) => {
		if (err) throw err;
		res.send(
			`Successfully deleted watchlist item from user with id: ${userId} for movie with id: ${movieId}`
		); // send a sensible success message
	});
});

module.exports = router;
