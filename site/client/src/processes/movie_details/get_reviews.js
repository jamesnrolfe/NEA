import axios from "axios";

export const getReviews = async (id) => {
	// get all the reviews for the movie
	return new Promise((resolve) => {
		axios
			.post("http://localhost:3001/api/reviews_and_ratings/get", {
				get_by_movie: true,
				id: id,
			})
			.then((results) => {
				resolve(results.data);
			});
	});
};

export const getReviewData = async (id) => {
	// update and return the review data for the movie
	return new Promise((resolve) => {
		axios.post("http://localhost:3001/api/movie_details/update", { id: id }).then((result) => {
			// update the movie details and then...
			axios
				.post("http://localhost:3001/api/movie_details/get", { id: id }) // get them and send them to the client
				.then((details) => {
					resolve(details.data[0]);
				});
		});
	});
};
