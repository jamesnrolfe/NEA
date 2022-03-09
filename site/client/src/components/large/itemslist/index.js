import React from "react";
import ItemsList from "./itemslist";

import { useState, useEffect } from "react";

const ItemsListContainer = (props) => {
	// imported items need to be in object form,
	// {
	//   label: string
	//   picture: url
	//   datapiece: just a piece of data to go on the end
	// }

	let [data, setData] = useState([]);

	useEffect(() => {
		setData(props.data);
	}, [props.data, setData]);

	return <ItemsList data={data} />;
};

export default ItemsListContainer;
