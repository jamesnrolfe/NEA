import React from "react";

import Sidebar from "./sidebar"; // import the visual element

const SidebarContainer = (props) => {
	return (
		<Sidebar
			className={props.visibility ? "Sidebar active" : "Sidebar"}
			hide={props.hideSidebar}
			switchTheme={props.switchTheme}
		/> // most function is given by navbar, ie props
	);
};

export default SidebarContainer; // to be used by the navbar
