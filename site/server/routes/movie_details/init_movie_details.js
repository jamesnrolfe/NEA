const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	let ids = []; // we need an array to store all the ids
	const sqlToGetIDs = "SELECT movie_id FROM movie_links"; // this should contain all movie ids
	const sqlToAddMovies =
		"INSERT INTO movie_details(movie_id, num_ratings, average_rating, num_reviews) VALUES (?, 0,0,0)";

	const getIDs = () => {
		return new Promise((resolve) => {
			// program has to wait so we use a promise
			con.query(sqlToGetIDs, (err, result) => {
				if (err) throw err; // if there is an error, throw it
				ids = Object.keys(result); // the ids are the keys in the JSON object
				resolve(); // tell the program to move on
			});
		});
	};

	const addMovies = () => {
		for (id in ids) {
			// for all of the ids in the list
			con.query(sqlToAddMovies, [id], (err, result) => {
				// add them individually to the server
				if (err) throw err;
			});
		}
	};

	const main = async () => {
		await getIDs(); // after we get the ids
		addMovies(); // then add them to the database
	};

	main();
});

module.exports = router;
