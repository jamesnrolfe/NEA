import React, { useEffect, useState } from "react";
import { SearchPage } from "./searchpage";

import { getAllMovieTitles } from "../../processes/search/get_all_movie_titles";
import { fetchDetails } from "../../processes/movie_details/add_and_fetch_details";

import { connect } from "react-redux";

const SearchPageContainer = (props) => {
	const [titles, setTitles] = useState([]); // all the possible search results
	const [results, setResults] = useState([]); // the narrowed search results
	const [output, setOutput] = useState([]); // what is actually shown on the screen
	let [head, setHead] = useState(0); // for scrolling through the values
	const [loaded, setLoaded] = useState(false); // just whether we can display the info or not

	useEffect(() => {
		const getData = async () => {
			// run once on intialisation
			// we need to load in all the titles
			getAllMovieTitles().then((all_titles) => {
				setTitles(all_titles); // set the titles to the returned value
				setLoaded(true); // we are loaded, thus we can render the screen
			});
		};
		getData(); // just run the above function - useEffect doesn't allow for direct async
	}, [props.links]); // we can only run this function when links are loaded: see mapStateToProps below

	useEffect(() => {
		setOutput([]); // we need to reset the output each time
		const shownTitles = results.slice(head, head + 10); // temp
		shownTitles.forEach(async (title) => {
			// for every title we need to fetch the information about it
			fetchDetails(title.movie_id).then((details) => {
				// for each movie we want label, picture, datapiece (here popularity)
				const formattedResult = {
					id: title.movie_id,
					label: title.title,
					picture: "https://image.tmdb.org/t/p/w500" + details.poster_path,
					datapiece: details.popularity.toFixed(0) + " popularity score",
				};
				setOutput((output) => [...output, formattedResult]);
			});
		});
	}, [results, head]); // if either results or head is changed, we want to update output

	const handleChange = ({ target }) => {
		// what happens when searchbar is typed into
		const { value } = target;
		// we need to update setResults to the items that's titles include the value
		setResults(
			titles.filter((title) => {
				if (title.title.toLowerCase().includes(value.toString().toLowerCase())) {
					// if the title contains the search string
					return title; // then we can add it to the list of results
				}
			})
		); // remove all values from setResults
	};

	const increaseHead = () => {
		console.log(head, results.length);
		if (results.length >= head + 10) {
			setHead((head += 10));
		}
	};

	const decreaseHead = () => {
		if (head >= 10) {
			setHead((head -= 10));
		}
	};

	return loaded ? (
		<React.Fragment>
			<SearchPage
				results={output}
				handleChange={handleChange}
				increaseHead={increaseHead}
				decreaseHead={decreaseHead}
				head={head}
				reslength={results.length}
			/>
		</React.Fragment>
	) : (
		<div>Loading...</div> // if we are not loaded yet, display simple message
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

export default connect(mapStateToProps)(SearchPageContainer);
