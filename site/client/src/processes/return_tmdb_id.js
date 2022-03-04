import { StrictMode } from "react";
import { store } from "../index";

export const getTMDBId = (id) => {
	const links = store.getState().links;
	if (links != null) {
		for (let i = 0; i < links.length; i++) {
			if (links[i].movie_id == id) {
				return links[i].tmdb_id;
			}
		}
	}
	return null;
};
