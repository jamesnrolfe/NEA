export const createRecommendations = (correlations, userReviews) => {
	let mostCorrelatedMovie = [null, -Infinity]; // we always want there to be a "most correlated movie"
	// that isnt null, and so we initialise the score to be negative infinity so any score will be greater,
	// no matter how bad
	let recommendations = [];
	for (let i = 0; i < correlations.length; i++) {
		// for all of our correlations
		let updateFlag = false; // initialise update flag to be false: we don't know if there will be
		// an update or not - safer to assume not
		let userReviewIndex = null; // we don't know yet - find out below
		for (let j = 0; j < userReviews.length; j++) {
			// for all the user reviews
			if (Number(correlations[i][0]) === Number(userReviews[j][0])) {
				// if the user review matches the correlation we are looking at
				userReviewIndex = j; // it must be the correct index
				break; // no need to continue since we found our value
			}
		}

		// ============ generate scores ============================
		const score = correlations[i][2] * Math.pow(userReviews[userReviewIndex][1], 2);
		// the correlation score, multiplied by the user rating squared
		// =========================================================

		for (let k = 0; k < recommendations.length; k++) {
			// for all our current recommendations (list will grow)
			if (Number(recommendations[k][0]) === Number(correlations[i][0])) {
				// if we already have a recommendation of the selected movie
				recommendations += score; // then simply sum the scores
				updateFlag = true; // since we have updated, change the updateFlag
				if (recommendations[k][1] > mostCorrelatedMovie[1]) {
					// if the new score is
					// the most correlated...
					mostCorrelatedMovie = [recommendations[k][0], recommendations[k][1]]; // ... update our
					// most correlated score
				}
				break; // no need to continue
			}
		}
		if (updateFlag === false) {
			// if there was no updating of scores
			if (score > mostCorrelatedMovie[1]) {
				// check for most correlated movie
				mostCorrelatedMovie = [correlations[i][1], score]; // if so update
			}
			recommendations.push([correlations[i][1], score]); // add the new recommendation to our list
		}
	}
	return [recommendations, mostCorrelatedMovie]; // return an tuple containing our required values
};
