import React from "react";
import { generateCorrelations } from "../../processes/create_recommendations";
import { getMovieDetails } from "../../tmdb/get_movie_details";
import Button from "../../components/small/button";

import { useSelector, useDispatch } from "react-redux";
import { addMovieDetails } from "../../redux/actions";
import { addLinks } from "../../redux/actions";
import { loadLinks } from "../../processes/load_links";

import { getTMDBId } from "../../processes/return_tmdb_id";

const Homepage = () => {
	//
	const dispatch = useDispatch();

	const makeRecommendations = async () => {
		generateCorrelations(15).then((correlations) => {
			console.log(correlations);
		});
	};

	const getDetails = async () => {
		getMovieDetails(getTMDBId(1)).then((details) => {
			dispatch(addMovieDetails(details.data));
		});
	};

	const loadLink = async () => {
		loadLinks().then((links) => {
			dispatch(addLinks(links.data));
		});
	};

	return (
		<div className="HomePage placeholder">
			<Button value={"make recommendations"} onClick={makeRecommendations} />
			<Button value={"get details"} onClick={getDetails} />
			<Button value={"load links"} onClick={loadLink} />
		</div>
	);
};

export default Homepage;
