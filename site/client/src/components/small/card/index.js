import React from "react";

import "./card.scss";

const Card = (props) => {
	return (
		<div className={`Card ${props.className} ${props.color} ${props.size}`}>
			{props.innerHTML}
		</div>
	);
};

export default Card;
