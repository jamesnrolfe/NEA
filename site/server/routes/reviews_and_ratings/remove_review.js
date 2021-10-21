const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const user_id = Number(req.body.user_id); // we only need the two variables since we are simply removing a review
	const movie_id = Number(req.body.movie_id); // which uses a composite key of movie id and user id
	const sql = "DELETE FROM user_reviews WHERE user_id = ? AND movie_id = ?";
	// now send our request...
	con.query(sql, [user_id, movie_id], (err, result) => {
		if (err) throw err;
		res.send(
			`Successfully deleted rating from user with id: ${user_id} for movie with id: ${movie_id}`
		);
	});
});

module.exports = router;
