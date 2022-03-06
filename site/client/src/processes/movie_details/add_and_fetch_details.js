import { getMovieDetails } from "./get_movie_details";
import { getTMDBId } from "../tmdb/return_tmdb_id";
import { store } from "../../index";
import { addMovieDetails } from "../../redux/actions";

export const fetchDetails = async (id) => {
	return new Promise((resolve) => {
		const tmdb_id = getTMDBId(id);
		getMovieDetails(tmdb_id).then((details) => {
			const currentDetails = store.getState().movie_details; // the current state of the movie_details
			for (let i = 0; i < currentDetails.length; i++) {
				// loop through current items
				if (currentDetails[i].id === id) {
					// if its in, return the current details

					resolve(currentDetails[i]);
				}
			}
			// if it wasnt in, then we need to add them
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
			store.dispatch(
				// subject to change
				addMovieDetails(newDetails)
			);
			resolve(newDetails);
		});
	});
};
