import { combineReducers } from "redux";
import userReducer from "./user";
import recommendationsReducer from "./recommendations";
import movieDetailsReducer from "./movies";
import linksReducer from "./links";

const rootReducer = combineReducers({
	user: userReducer,
	recommendations: recommendationsReducer,
	movie_details: movieDetailsReducer,
	links: linksReducer,
});

export default rootReducer;
