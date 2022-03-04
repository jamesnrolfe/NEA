const linksReducer = (state = null, action) => {
	switch (action.type) {
		case "ADDLINKS":
			return action.payload;
		default:
			return state;
	}
};

export default linksReducer;
