const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	// all information is required in this, as it can all be edited - except for movie_id and user_id
	// however they are required to determine which user-movie combination is being edited.
	const user_id = req.body.user_id;
	const movie_id = req.body.movie_id;
	const rating = req.body.rating;
	const review_head = req.body.review_head;
	const review_body = req.body.review_body;
	const survey_1 = req.body.survey_1;
	const survey_2 = req.body.survey_2;
	const sql =
		"UPDATE user_reviews SET rating = ?, review_head = ?, review_body = ?, survey_1 = ?, survey_2 = ? WHERE user_id = ? AND movie_id = ?";
	con.query(
		sql,
		[rating, review_head, review_body, survey_1, survey_2, user_id, movie_id],
		(err, result) => {
			if (err) throw err; // if we get an error, alert the server
			res.send(
				`Successfully update review from user with id: ${user_id} for movie with id: ${movie_id}`
			);
		}
	);
});

module.exports = router;
