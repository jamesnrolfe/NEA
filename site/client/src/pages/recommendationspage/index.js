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
	const [output, setOutput] = useState([]);
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
					setRecommendations(newRecs); // just set them initally
				});
			}
		};
		addRecs(); // call the function
	}, []);

	useEffect(() => {
		setOutput([]); // reset the output
		if (recommendations.length > 0) {
			// if the recommendations are actually loaded
			const shownRecs = recommendations.slice(head, head + 10); // we only want to see 10 at a time
			const bestScore = recommendations[0].score; // save the best score
			shownRecs.forEach(async (rec) => {
				// for every recommendation on the screen
				fetchDetails(rec.movie_id).then((details) => {
					// find the details for it
					const formattedResult = {
						label: details.title,
						picture: "https://image.tmdb.org/t/p/w500" + details.poster_path,
						datapiece:
							((rec.score / bestScore) * 100).toFixed(0).toString() + "% match", // give the recommendation score
						// as a percentage of the best score (to 0 d.p.)
					};
					setOutput((output) => [...output, formattedResult]); // append it to the output
				});
			});
		}
	}, [recommendations, head]); // we only want this to run when recommendations and head are updated

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

	return (
		<React.Fragment>
			{recommendations.length > 0 ? ( // are we loaded?
				<RecommendationsPage
					recommendations={output}
					decreaseHead={decreaseHead}
					increaseHead={increaseHead}
					head={head}
					reclength={recommendations.length}
				/>
			) : (
				<div>Loading...</div> // if we aren't loaded, show a simple loading screen
			)}
		</React.Fragment>
	);
};

export default RecommendationsPageContainer;
