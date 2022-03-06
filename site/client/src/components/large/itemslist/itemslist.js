import React, { useEffect } from "react";
import Card from "../../small/card";

import "./itemslist.scss";

const ItemsList = (props) => {
	// useEffect(() => {}, [props.data]); // rerender when the data updates
	return (
		<div className="ItemsList">
			{props.data.map((item, i) => {
				// use the map function to give each item the format below:
				return (
					<Card
						key={i} // react likes this
						className="Item" // so we can modify some css
						innerHTML={
							<React.Fragment>
								{" "}
								{/* this is necessary so that we can stack divs */}
								{/* the title of the movie etc. */}
								<div className="label">{item.label}</div>
								{/* the picture with some alt text */}
								<img src={item.picture} alt={"not found"} />
								{/* the data item or whatever it is */}
								<div className="datapiece">{item.datapiece}</div>
							</React.Fragment>
						}
					/>
				);
			})}
		</div>
	);
};

export default ItemsList;
