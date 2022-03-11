// redux
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
// import throttle from "lodash.throttle";

// export const loadState = () => {
// 	// a function to find a previous state in redux and load it into the current state
// 	try {
// 		const serializedState = localStorage.getItem("state"); // find the old state
// 		if (serializedState === null) {
// 			// if it doesn't exist, return undefined
// 			return undefined;
// 		}
// 		return JSON.parse(serializedState); // otherwise parse it and return it
// 	} catch (err) {
// 		return undefined;
// 	}
// };

// export const saveState = () => {
// 	// a function to save the current redux store to localstorage, so it can be reused
// 	try {
// 		const serializedState = JSON.stringify(store); // make the object a string
// 		localStorage.setItem("state", serializedState); // add it to localstorage
// 	} catch {
// 		console.log("Failed to save state.");
// 	}
// };

// const persistedState = loadState();
export const store = createStore(
	rootReducer,
	// persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // just a testing extension
); // create redux store

// store.subscribe(
// 	throttle(() => {
// 		console.log("running...");
// 		saveState({
// 			todos: store.getState().todos,
// 		});
// 	}),
// 	1000
// );
