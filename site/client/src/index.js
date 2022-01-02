import ReactDOM from "react-dom";
// necessary to use react - allows it to be rendered. Since every file is a child to this one, no
// other files need to do this really.

import { useState } from "react";

// import the theme file containing the information about what colours to use with what theme
import "./theme.scss";

// router tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Homepage from "./pages/homepage";

// navbar
import Navbar from "./components/large/navbar";

const App = () => {
	// default/base function component

	const [darkTheme, setDarkTheme] = useState(true);

	const switchTheme = () => {
		setDarkTheme(!darkTheme);
		const body = document.querySelector("body");
		body.className = darkTheme ? "light" : "dark";
	};

	return (
		<Router>
			<Navbar switchTheme={switchTheme} />
			<Routes>
				<Route path="/" exact component={Homepage} />
				{/* home page here on the default url */}
			</Routes>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
