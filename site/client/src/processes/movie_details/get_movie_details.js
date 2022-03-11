import axios from "axios";

export const getMovieDetails = (tmdb_id) => {
	return new Promise((resolve) => {
		// make the program wait for the result...
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=f78e990c2b426646e905b8c7b8654da7`
			) // get details from tmdb
			.then((res) => {
				resolve(res); // then send them back
			});
	});
};
