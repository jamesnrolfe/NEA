import ReactDOM from "react-dom";

// router tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Homepage from "./pages/homepage";

const App = () => {
	// default/base function component
	return (
		<Router>
			<Routes>
				<Route path="/" exact component={Homepage} />
				{/* home page here on the default url */}
			</Routes>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
