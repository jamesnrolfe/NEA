const recommendationsReducer = (state = null, action) => {
	// we can define the state to initialise as null instead of an empty array, since we are never adding items, just updating the entire thing
	switch (action.type) {
		case "UPDATERECS":
			return action.payload;
		case "REMOVERECS":
			return null;
		default:
			return state;
	}
};

export default recommendationsReducer;
