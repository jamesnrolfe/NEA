import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { updateRecommendations } from "../../processes/recommendations/update_recommendations";
import { fetchDetails } from "../../processes/movie_details/add_and_fetch_details";

import { store } from "../..";

import { RecommendationsPage } from "./recommendationspage";
import Button from "../../components/small/button/button";

const RecommendationsPageContainer = () => {
	const [recommendations, setRecommendations] = useState([]);
	let [head, setHead] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		if (store.getState().user === null) {
			// if the user is not signed in
			navigate("/signup"); // make them :)
		}
	});

	useEffect(() => {
		const addRecs = async () => {
			// we need an async function here really
			if (store.getState().user) {
				// if the user is signed in
				updateRecommendations(store.getState().user.id).then((newRecs) => {
					// generate the recommendations for the current user
					const bestScore = newRecs[0].score;
					let formattedRecs = [];
					newRecs.forEach((rec) => {
						// for all of our recommendations we need certain data to be displayed
						// we want:
						// - title
						// - score as a percentage of best score
						// - poster path
						fetchDetails(rec.movie_id).then((details) => {
							const formattedRec = {
								label: details.title,
								picture: "https://image.tmdb.org/t/p/w500" + details.poster_path,
								datapiece:
									((rec.score / bestScore) * 100).toFixed(0).toString() +
									"% match",
							};
							// error here is likely due to different fetch times
							// just do another sort of the data
							setRecommendations((recommendations) => [
								...recommendations,
								formattedRec,
							]);
						});
					});
					// .then(() => {
					// 	setRecommendations(formattedRecs);
					// });
				});
			}
		};
		addRecs(); // call the function
	}, []);

	const increaseHead = () => {
		if (recommendations.length >= head) {
			setHead((head += 10));
		}
	};

	const decreaseHead = () => {
		if (head >= 10) {
			setHead((head -= 10));
		}
	};

	const getSlice = () => {
		return recommendations.slice(head, head + 10);
	};

	return (
		<React.Fragment>
			{recommendations.length > 0 ? (
				<RecommendationsPage
					recommendations={getSlice()}
					decreaseHead={decreaseHead}
					increaseHead={increaseHead}
				/>
			) : (
				<div>Loading...</div>
			)}
		</React.Fragment>
	);
};

export default RecommendationsPageContainer;
