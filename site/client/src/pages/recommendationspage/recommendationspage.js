import React from "react";
import ItemsList from "../../components/large/itemslist";

import "./recommendationspage.scss";

import Button from "../../components/small/button";

export const RecommendationsPage = (props) => {
	return (
		<div className="RecommendationsPage">
			<div className="ChangeButtons Top">
				<Button value="<" size={"medium"} onClick={props.decreaseHead} />
				<Button value=">" size={"medium"} onClick={props.increaseHead} />
			</div>
			<div className="Title">Your recommendations</div>
			<ItemsList data={props.recommendations} />
		</div>
	);
};
