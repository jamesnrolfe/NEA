import axios from "axios";

export const getAllMovieTitles = async () => {
	return new Promise((resolve) => {
		// return a new promise saying we are processing some data...
		axios.post("http://localhost:3001/api/movie_details/get_all").then((movies) => {
			// get a full list of the movie ids
			resolve(movies.data);
		});
	});
};
