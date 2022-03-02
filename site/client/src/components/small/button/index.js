import React from "react";

import Button from "./button"; // import visual element

const ButtonContainer = (props) => {
	return (
		<Button
			className={props.className}
			value={props.value}
			color={props.color}
			size={props.size}
			onClick={props.onClick}
			disabled={props.disabled}
		/> // this one literally just renders the visual component, since the button doesn't
		// have any logic actually associated directly with it - the logic is given to it
		// by the onClick prop
	);
};

export default ButtonContainer; // export to be used by other components
