const movieDetailsReducer = (state = [], action) => {
	switch (action.type) {
		case "ADDMOVIE":
			state.push(action.payload);
			return state;
		// we never need to remove really, this is kind of like a cache
		default:
			return state;
	}
};

export default movieDetailsReducer;
