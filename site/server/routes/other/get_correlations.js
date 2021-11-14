const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	let ratedMovies = [];
	const id = req.body.user_id; // we will use the user id to determine what to return

	const getUsersRatedMovies = () => {
		const sql = "SELECT movie_id FROM user_reviews WHERE user_id = ? AND rating > 2"; // get all of the movies
		// from the current user where the rating is better than 2
		return new Promise((resolve) => {
			// program must wait for this to be done, so we use a promise
			con.query(sql, id, (err, rows) => {
				if (err) throw err;
				for (var row of rows) {
					ratedMovies.push(row.movie_id);
				}
				console.log(ratedMovies);
				resolve(); // we are done - program can continue
			});
		});
	};

	const getCorrelatedMovies = (movies) => {
		console.log("getCorrelations", movies);
		const sql =
			"SELECT movie_1_id, movie_2_id, correlation_score FROM movie_correlations WHERE movie_1_id IN ( ? )";
		// if the movie is in the list of movies, we can get the correlation data for it
		con.query(sql, movies, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	};

	const main = async () => {
		await getUsersRatedMovies(); // after we get the list of movies
		getCorrelatedMovies(ratedMovies); // we can get the correlations
	};

	main();
});

module.exports = router;
