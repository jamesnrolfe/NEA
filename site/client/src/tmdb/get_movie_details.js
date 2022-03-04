import axios from "axios";

export const getMovieDetails = (tmdb_id) => {
	return new Promise((resolve) => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=f78e990c2b426646e905b8c7b8654da7`
			)
			.then((res) => {
				resolve(res);
			});
	});
};
