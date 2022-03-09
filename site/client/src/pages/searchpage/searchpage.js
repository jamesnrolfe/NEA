import React from "react";
import "./searchpage.scss";

import ItemsList from "../../components/large/itemslist/itemslist";
import Button from "../../components/small/button/button";

import { FiSearch } from "react-icons/fi";

export const SearchPage = (props) => {
	return (
		<div className="SearchPage">
			<div className="SearchBar">
				<FiSearch />
				<input
					type="text"
					placeholder="Search for movies..."
					onChange={props.handleChange}
				/>
			</div>
			<div className="ChangeButtons">
				<Button
					value="<"
					size={"medium"}
					color={"accent"}
					onClick={props.decreaseHead}
					disabled={props.head < 10} // if we cannot go back, disable the button
				/>
				<Button
					value=">"
					size={"medium"}
					color={"accent"}
					onClick={props.increaseHead}
					disabled={props.head + 10 > props.reslength} // if we cannot advance, disable the button
				/>
			</div>
			<ItemsList data={props.results} />
		</div>
	);
};
