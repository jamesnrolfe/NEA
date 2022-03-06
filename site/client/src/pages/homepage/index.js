import React from "react";
import { updateRecommendations } from "../../processes/recommendations/update_recommendations";

import Button from "../../components/small/button";

import { store } from "../..";
import { useDispatch } from "react-redux";
import { fetchDetails } from "../../processes/movie_details/add_and_fetch_details";

const Homepage = () => {
	//
	const dispatch = useDispatch();

	const makeRecommendations = async () => {
		updateRecommendations(store.getState().user.id).then(() => {
			const recs = store.getState().recommendations;
			console.log(recs);
		});
	};

	const _addDetails = (id) => {
		fetchDetails(102).then((details) => {
			console.log(details);
		});
	};

	return (
		<div className="HomePage placeholder">
			<Button value={"make recommendations"} onClick={makeRecommendations} size={"large"} />
			<Button value={"get details"} onClick={_addDetails} size={"large"} />
		</div>
	);
};

export default Homepage;
