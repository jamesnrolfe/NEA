import React from "react";
import "./reviewpage.scss";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Button from "../../components/small/button/button";

export const ReviewPage = props => {
    return (
        <div className="ReviewPage">
            {/* we want to include some stars to rate the movie in a visually appealing way */}
            <div className="Stars">
                <div
                    className="star"
                    onClick={() => {
                        // when we click, we run the onRatingChange function
                        // with the parameter of the rating we are selecting
                        props.onRatingChange(1);
                    }}>
                    {/* if the current rating is not 1 or above, we don't display this
                    this means that we get a cumilative effect on the stars, so if we are 
                    rating something a 4 for example, all stars up to 4 will be filled */}
                    {props.currentRating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
                </div>
                <div
                    className="star"
                    onClick={() => {
                        props.onRatingChange(2);
                    }}>
                    {props.currentRating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
                </div>
                <div
                    className="star"
                    onClick={() => {
                        props.onRatingChange(3);
                    }}>
                    {props.currentRating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
                </div>
                <div
                    className="star"
                    onClick={() => {
                        props.onRatingChange(4);
                    }}>
                    {props.currentRating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
                </div>
                <div
                    className="star"
                    onClick={() => {
                        props.onRatingChange(5);
                    }}>
                    {props.currentRating >= 5 ? <AiFillStar /> : <AiOutlineStar />}
                </div>
            </div>
            {/* if we are breaking the rules, add the error class so we can 
            make stuff red etc to let the user know what is going on */}
            <div className={"Head " + (props.headlength <= 50 ? "" : "error")}>
                <input
                    type="text" // text input
                    value={props.reviewData.head} // we update the value like this
                    // so that we can make changes and add data without the user typing it in
                    placeholder="Title" // the text that will be shown before anything is typed
                    id="head" // the identifier which says what we will recieve data under
                    onChange={props.onTextChange} // when something changes, alert this function
                    autoComplete="off"></input>
                <div className="lettercount">{props.headlength} / 50</div>
                {/* above is a counter to tell the user how many characters
                they have left */}
            </div>
            <div className={"Body " + (props.bodylength <= 300 ? "" : "error")}>
                {/* above: same as before but now with body settings */}
                <textarea
                    // we use a textarea for bigger input
                    type="text"
                    value={props.reviewData.body}
                    placeholder="Review"
                    id="body"
                    onChange={props.onTextChange}></textarea>
                <div className="lettercount">{props.bodylength} / 300</div>
            </div>
            <div className={"Submit"}>
                {/* we need a submit button */}
                <Button
                    value="Submit"
                    disabled={
                        // we only enable the button when everything is working
                        !props.isThereARating || props.headlength > 50 || props.bodylength > 300
                    } // if we are breaking any rules, don't allow the button to work
                    color="accent"
                    size="large"
                    onClick={props.onSubmit} // the submit function
                />
            </div>
            <div className={"Delete"} onClick={props.onDelete}>
                {/* if we want to delete, call the relevant function */}
                <BiTrash />
                {/* render a bin */}
            </div>
        </div>
    );
};
