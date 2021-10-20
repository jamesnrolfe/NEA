import ReactDOM from "react-dom";
import ControlBoard from "./components/control_board";

const App = () => {
	// default/base function component
	return (
		<>
			<ControlBoard />
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
