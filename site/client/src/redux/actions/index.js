export const addUser = (userdata) => {
	return {
		type: "ADDUSER",
		payload: userdata,
	};
};

export const removeUser = () => {
	return {
		type: "DELETEUSER",
	};
};

export const updateRecommendations = (recommendations) => {
	return {
		type: "UPDATERECS",
		payload: recommendations,
	};
};

export const removeRecommendations = () => {
	return {
		type: "REMOVERECS",
	};
};

export const addMovieDetails = (movieDetails) => {
	return {
		type: "ADDMOVIE",
		payload: movieDetails,
	};
};

export const addLinks = (links) => {
	return {
		type: "ADDLINKS",
		payload: links,
	};
};
