import axios from "axios";
import { insertionSort } from "../other/sorting";

export const generateRecommendations = async (user_id) => {
	// we are doing this based on the user we are given
	return new Promise((resolve) => {
		// we use a promise so the item requesting knows that this will take some time
		// i.e. it knows it can wait for the data
		axios
			.post("http://localhost:3001/api/reviews_and_ratings/get", {
				getByMovie: false,
				id: user_id,
			}) // firstly we get the user ratings
			.then((ratings) => {
				axios
					.post("http://localhost:3001/api/other/get_correlations", { user_id: user_id })
					.then((correlations) => {
						// then we get the correlations
						createRecommendations(ratings.data, correlations.data).then(
							(recommendations) => {
								// now we create the recommendations
								insertionSort(recommendations).then((sorted) => {
									resolve(sorted); // and sort + return them
								});
							}
						);
					});
			});
	});
};

const createRecommendations = async (userRatings, correlations) => {
	let recommendations = []; // emtpy array which will contain our correlations
	correlations.forEach((correlation) => {
		// for every correlation we have, we need to give it a score
		// firstly, we need the rating the user gave the movie its correlated with
		let rating = null; // initially we dont know, so keep it null. This should never stay null
		let rated = false;
		for (let i = 0; i < userRatings.length; i++) {
			// for all the user ratings
			if (userRatings[i].movie_id === correlation.movie_1_id) {
				// if the id's match
				rating = userRatings[i].rating; // update our rating
			}
			if (userRatings[i].movie_id === correlation.movie_2_id) {
				// we also need to check if the movie is one that we have already rated
				// in which case we don't want to include it
				rated = true; // we now don't do anything if we have already rated
			}
		}
		if (!rated) {
			// the score is the correlation score * the rating^2
			const score = correlation.correlation_score * Math.pow(rating, 2);

			// however, we can't just add this score immediately
			// if the movie is correlated with another rated movie, then we ideally want to sum the scores

			let updateFlag = false; // if we don't update a score, we need to actually need to make a new one
			for (let i = 0; i < recommendations.length; i++) {
				if (recommendations[i].movie_id === correlation.movie_2_id) {
					// if the recommendation id is equal to the new recommendation id
					recommendations[i].score += score;
					updateFlag = true;
				}
			}
			if (!updateFlag) {
				// if we didn't update
				recommendations.push({
					movie_id: correlation.movie_2_id,
					score: score,
				});
			}
		}
	});
	return recommendations;
};
