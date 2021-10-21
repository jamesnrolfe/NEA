const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	// read all of the data from the POST request
	const user_id = req.body.user_id; // we need both user id and movie id to determine which user reviewed which movie
	const movie_id = req.body.movie_id;
	const rating = req.body.rating;
	const review_head = req.body.review_head;
	const review_body = req.body.review_body;
	const survey_1 = req.body.survey_1; // questions (e.g. was this family friendly?)
	const survey_2 = req.body.survey_2;
	const sql =
		"INSERT INTO user_reviews(user_id, movie_id, rating, review_head, review_body, survey_1, survey_2) VALUES (?,?,?,?,?,?,?)";
	con.query(
		sql,
		[user_id, movie_id, rating, review_head, review_body, survey_1, survey_2],
		(err, result) => {
			if (err) throw err; // if we get an error, alert the server
			res.send(
				`Successfully added review from user with id: ${user_id} for movie with id: ${movie_id} titled ${review_head}`
			); // else simply send a success message
		}
	);
});

module.exports = router;
