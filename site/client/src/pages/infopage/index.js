import React, { useState, useEffect } from "react";
import { fetchDetails } from "../../processes/movie_details/add_and_fetch_details";
import { getReviews, getReviewData } from "../../processes/movie_details/get_reviews";
import { InfoPage } from "./infopage";

import { connect } from "react-redux";

const InfoPageContainer = (props) => {
	const [movieId, setMovieId] = useState(null);
	const [details, setDetails] = useState({});
	const [reviews, setReviews] = useState([]);
	const [reviewData, setReviewData] = useState({});
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (props.links) {
			setMovieId(getIdFromURL()); // set the state of movieId
		}
	}, [props.links]);

	useEffect(() => {
		// we need to fetch the information about the movieId when it's updated
		const getData = async () => {
			fetchDetails(movieId).then((details) => {
				// get the movie details from tmdb...
				setDetails(details);
				setLoaded(true); // we are loaded (this should take the longest, but it doesn't really matter)
			});
			getReviews(movieId).then((reviews) => {
				// get a list of all the reviews of the movie...
				setReviews(reviews);
			});
			getReviewData(movieId).then((data) => {
				// get all the review data from the database...
				setReviewData(data);
			});
		};
		if (movieId != null) {
			// just a precaution, if we have a movieId, we can load data
			getData();
		}
	}, [movieId]);

	const getIdFromURL = () => {
		let params = new URLSearchParams(window.location.search); // search the url for the given parameters
		return params.get("id"); // return the id parameter
	};

	return loaded ? (
		<InfoPage details={details} reviews={reviews} reviewData={reviewData} />
	) : (
		<div>Loading...</div>
	);
};

const mapStateToProps = (state) => {
	// we need to know if links are loaded before we can do anything
	// otherwise, we cannot get any information about the movies and the whole thing will not work
	// so, we map the links in redux to a prop called links. Above, we have the initialisation
	// of titles on a useEffect with props.links as the only dependency, so it will only run once we have
	// links in the redux store.
	return {
		links: state.links,
	};
};

export default connect(mapStateToProps)(InfoPageContainer);
