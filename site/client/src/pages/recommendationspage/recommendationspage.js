import React from "react";
import ItemsList from "../../components/large/itemslist";

import "./recommendationspage.scss";

import Button from "../../components/small/button";

export const RecommendationsPage = (props) => {
	return (
		<div className="RecommendationsPage">
			<div className="ChangeButtons Top">
				<Button
					value="<"
					size={"medium"}
					color={"accent"}
					onClick={props.decreaseHead}
					disabled={props.head < 10}
				/>
				<Button
					value=">"
					size={"medium"}
					color={"accent"}
					onClick={props.increaseHead}
					disabled={props.reslength <= props.head + 10}
				/>
			</div>
			<div className="Title">Your recommendations</div>
			<ItemsList data={props.recommendations} />
		</div>
	);
};
