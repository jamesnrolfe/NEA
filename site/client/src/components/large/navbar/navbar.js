import React from "react";

import "./navbar.scss"; // import the css file
import Sidebar from "../sidebar"; // we render the sidebar from this component, so we
// need to import that
import Button from "../../small/button";
import { Link } from "react-router-dom"; // allows links to send to different parts of the website
import { FiSearch } from "react-icons/fi"; // just an icon
import Media from "react-media"; // allows for responsive rendering as you will see below

const Navbar = (props) => {
	// presentational

	return (
		<div className="Navbar">
			{/* a whole container */}
			<ul className="NavLeft">
				<li className="MenuButton">
					{/* a menu button that is just a burger bar, thats what the 
                svg is */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						onClick={props.showSidebar}
					>
						<path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
					</svg>
				</li>
				<Link to="/">
					{/* the logo will link back to the homepage, which doesn't have a path as such */}
					<li className="Logo">LOGO HERE</li>
				</Link>
			</ul>
			<Media
				query="(min-width: 800px)"
				render={() => (
					<div className="SearchBar">
						{/* if the width is greater than 800px then you can render the search bar,
                        since there will be enough space */}
						<FiSearch />
						<input type="text" placeholder="Search for movies..." />{" "}
						{/* placeholder just fills the searchbar with 
                            some text if nothing is typed in yet */}
					</div>
				)}
			/>
			<Media
				query="(min-width: 600px)"
				render={() => (
					<ul className="NavLinks">
						{/* if the screen size is greater than 600px then you can render the navlinks on the right */}
						<li className="notButton">
							<Link to="/watchlist">Watchlist</Link>
							{/* link to the watchlist page */}
						</li>
						<li>
							<Link to="/signup">
								{/* get a button to link to the signup page */}
								<Button
									className="NavbarSignUpButton"
									value="Sign up"
									color="accent"
									size="medium"
								/>
							</Link>
						</li>
					</ul>
				)}
			/>
			<Sidebar
				visibility={props.sidebar}
				hideSidebar={props.showSidebar}
				switchTheme={props.switchTheme}
			/>{" "}
			{/* render the sidebar, sending in the appropriate props */}
		</div>
	);
};

export default Navbar; // export the navbar to the container element
