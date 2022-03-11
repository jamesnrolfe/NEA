import { getMovieDetails } from "./get_movie_details";
import { getTMDBId } from "../tmdb/return_tmdb_id";
import { store } from "../../store";
import { addMovieDetails } from "../../redux/actions";

export const fetchDetails = async (id) => {
	return new Promise((resolve) => {
		let newDetails = {}; // initialise
		const currentDetails = store.getState().movie_details; // the current state of the movie_details
		let insert = true; // do we need to make an api call?
		for (let i = 0; i < currentDetails.length; i++) {
			// loop through current items
			if (currentDetails[i].id === id) {
				// if its in, return the current details
				newDetails = currentDetails[i];
				insert = false; // and say that we don't need to make an api call
			}
		}
		if (insert) {
			const tmdb_id = getTMDBId(id);
			getMovieDetails(tmdb_id).then((details) => {
				console.log("Sending request to API...");
				const newDetails = {
					id: id,
					tmdb_id: details.data.id,
					title: details.data.title,
					genres: details.data.genres,
					description: details.data.overview,
					poster_path: details.data.poster_path,
					popularity: details.data.popularity,
					runtime: details.data.runtime,
				};

				// if it wasnt in, then we need to add them

				store.dispatch(
					// we can add it to redux
					addMovieDetails(newDetails)
				);
				resolve(newDetails); // and send back the details
			});
		} else {
			resolve(newDetails); // otherwise just send back the item from redux
		}
	});
};
