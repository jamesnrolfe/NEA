import React from "react";

import Navbar from "./navbar";
import { useState } from "react"; // so that we can toggle the sidebar from the navbar, which we will need
// to do to open it

const NavbarContainer = (props) => {
	const [sidebar, setSidebar] = useState(false); // we allow the sidebar to be boolean, open or closed
	// being true and false respectively. We initialise to false.

	const showSidebar = () => {
		// function to actually open the sidebar
		setSidebar(!sidebar); // swap the state from whatever it is already.
	};

	return <Navbar sidebar={sidebar} showSidebar={showSidebar} switchTheme={props.switchTheme} />; // actually render the
	// visual part of the component, defined within navbar.js
};

export default NavbarContainer; // export to be used by the index file so the navbar can be displayed
