const express = require("express");
const router = express.Router();
const con = require("../../connection");

// need to be able to do this with either movie_id OR user_id
// i will do this by sending in another parameter as well as ID called get_by_movie which
// should be a boolean - either true for getting by movie or false for getting by user

router.post("/", (req, res) => {
	const getByMovie = req.body.get_by_movie;
	const id = req.body.id;

	let sql = ""; // define sql using let so it can be modified
	if (getByMovie) {
		sql =
			"SELECT user_details.user_id, user_details.username, user_reviews.movie_id, user_reviews.rating, user_reviews.review_head, user_reviews.review_body, user_reviews.survey_1, user_reviews.survey_2 FROM user_reviews INNER JOIN user_details ON user_reviews.user_id = user_details.user_id WHERE user_reviews.movie_id = ?"; // getting by movie id
	} else {
		sql = "SELECT * FROM user_reviews WHERE user_id = ?"; // getting by user id
	}

	console.log(id);
	con.query(sql, id, (err, result) => {
		if (err) throw err;
		res.send(result); // if no error, send the result
	});
});

module.exports = router;
