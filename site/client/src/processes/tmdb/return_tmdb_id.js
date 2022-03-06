import { store } from "../../index";

export const getTMDBId = (id) => {
	const links = store.getState().links; // get the links from the redux store
	if (links != null) {
		// if the links are loaded
		for (let i = 0; i < links.length; i++) {
			// loop through the links
			if (links[i].movie_id === id) {
				return links[i].tmdb_id;
				// when/if we find our match, break out and return the tmdb_id
			}
		}
	}
	return null; // otherwise just return null to signify that we found nothing
};
