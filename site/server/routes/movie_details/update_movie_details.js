const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const id = req.body.movie_id;
	// we need to define our arrays. We could do this later, but I find it nice to do it early
	let ratings = [];
	let numRatings;
	let avgRating;
	let numReviews;
	const sqlToGetRatings =
		"SELECT rating FROM user_reviews WHERE movie_id = ? AND rating IS NOT NULL"; // the SQL command to get an array of all the
	// ratings
	const sqlToGetReviews =
		"SELECT review_head, review_body FROM user_reviews WHERE movie_id = ? AND (review_head IS NOT NULL OR review_body IS NOT NULL)";

	// the SQL command to get an array of all the review heads and bodies.
	// query for the rating
	const getRatings = () => {
		return new Promise((resolve) => {
			// create a Promise - as JS is asyncronous (things can work in parallel),
			// this is needed to essentially say "no, wait for the data to be fetched before you continue" to the rest of the program
			con.query(sqlToGetRatings, [id], (err, result) => {
				if (err) throw err; // throw any errors
				Object.keys(result).forEach((key) => {
					// for all the keys in the result (given as a JSON object)
					const row = result[key]; // a "row" is given by the key, just a made up thing
					ratings.push(row.rating); // add the rating to the ratings array
				});
				resolve(); // once we are done, tell the program that the promise is resolved and we can continue on
			});
		});
	};

	const computeRatingFunctions = (ratings) => {
		numRatings = ratings.length; // the number of ratings is simply the
		let totalRating = 0; // used for computing the average
		ratings.forEach((x) => {
			// for all of the ratings
			totalRating += x; // add the rating to the counter
		});
		avgRating = (totalRating / numRatings).toFixed(1); // toFixed rounds to 1 d.p.
	};

	const getReviews = () => {
		return new Promise((resolve) => {
			con.query(sqlToGetReviews, [id], (err, result) => {
				if (err) throw err; // if we get an error, throw it
				numReviews = result.length; // update numReviews with the number of fields we recieve
				// rating head and body for each movie counts as 1 review, even if one is null
				resolve(); // tell the program we are good to continue
			});
		});
	};

	const dealWithReviews = async () => {
		await getReviews();
	};

	const dealWithRatings = async () => {
		// make this function asyncronous so we can use promises
		await getRatings(); // AFTER we get the ratings ...
		computeRatingFunctions(ratings); // ... THEN we can compute the values
	};

	const getData = async () => {
		await dealWithRatings(); // AFTER we deal with the ratings ...
		await dealWithReviews(); // ... AND we deal with the reviews ...
		updateMovieDetails(); // ... then we can update the movie details
	};

	getData();

	const updateMovieDetails = () => {
		const sql =
			"UPDATE movie_details SET num_ratings = ?, average_rating = ?, num_reviews = ? WHERE movie_id = ?";
		con.query(sql, [numRatings, avgRating, numReviews, id], (err, result) => {
			if (err) throw err; // if we get an error, throw it (e.g. movie doesn't exist in table)
			res.send(`Successfully updated movie with id: ${id}`);
		});
	};
});

module.exports = router;
