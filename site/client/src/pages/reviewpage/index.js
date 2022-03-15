import React, { useState, useEffect } from "react";
import { ReviewPage } from "./reviewpage";
import { addReview, updateReview } from "../../processes/ratings/add_rating";
import { deleteReview } from "../../processes/ratings/delete_review";
import { getReview } from "../../processes/ratings/get_rating";

import { useNavigate } from "react-router";

import { store } from "../../store";

const ReviewPageContainer = () => {
    const [reviewData, setReviewData] = useState({ rating: 0, head: "", body: "" }); // the data that we are going to collect\
    // i.e. the review content and rating
    const [id, setId] = useState(null); // we need the id of the movie from the url
    const [update, setUpdate] = useState(false); // are we going to update or add a new review

    const navigate = useNavigate(); // for redirects

    useEffect(() => {
        if (store.getState().user === null) {
            // if the user is not signed in
            navigate("/signup"); // make them :)
        }
    });

    useEffect(() => {
        setId(getIdFromURL()); // set the id as the url
        // we also need to check if this user has already reviewed the movie, in which case we
        // can set the reviewdata to the current review so the user can make edits
        const getCurrentReview = async () => {
            getReview(store.getState().user.id, getIdFromURL()).then(result => {
                // we get our review from the server.
                // if it doesn't exist, data will be an empty array
                if (result.data.length > 0) {
                    // if data ISN'T an empty array we must have a previous review
                    setReviewData({
                        // so we can update it to the old review, now we are editing a review.
                        rating: result.data[0].rating,
                        head: result.data[0].review_head,
                        body: result.data[0].review_body,
                    });
                    // however, having done this, we now need to set a flag to say that we need
                    // to UPDATE a review, instead of adding a new one
                    setUpdate(true);
                }
            });
        };
        if (store.getState().user.id !== null) {
            // if we are signed in
            // --> this just gets rid of an annoying error in the terminal, it doesn't
            // really affect the program
            getCurrentReview();
        }
    }, []); // run only on component render

    const getIdFromURL = () => {
        let params = new URLSearchParams(window.location.search); // search the url for the given parameters
        return params.get("id"); // return the id parameter
    };

    const handleTextChange = ({ target }) => {
        const { id, value } = target; // unpack our input item
        // now we need to add it to the review data object
        setReviewData(prev => ({
            // add an item
            ...prev, // all the previous items +
            [id]: value, // the new error
        }));
    };

    const handleRatingUpdate = rating => {
        // we simply need to update the rating from the parameter we get
        setReviewData(prev => ({
            ...prev,
            rating: Number(rating),
        }));
    };

    const submitValues = () => {
        if (verify(reviewData)) {
            // if we are allowed to submit
            if (update) {
                // if we are updating a review
                updateReview(store.getState().user.id, id, reviewData);
            } else {
                // otherwise we are adding a new one
                addReview(store.getState().user.id, id, reviewData);
            }
            navigate("/info?id=" + id); // now take us back to that movie info page
        } else {
            console.log("invalid"); // this should never really happen since the button
            // isnt active unless stuff is working
        }
    };

    const verify = data => {
        // we need a function to just check the data as it stands is alright to be submitted
        let valid = true; // assume it is
        if (data.rating === null) {
            // we need a rating, otherwise we cannot continue
            valid = false;
        }
        return valid;
    };

    const handleDelete = () => {
        deleteReview(store.getState().user.id, id); // delete the review
        navigate("/info?id=" + id); // now take us back to that movie info page
    };

    return (
        <ReviewPage
            reviewData={reviewData}
            onTextChange={handleTextChange}
            onRatingChange={e => {
                handleRatingUpdate(e);
            }}
            onSubmit={submitValues}
            onDelete={handleDelete}
            currentRating={reviewData.rating}
            isThereARating={reviewData.rating === 0 ? true : false} // if we have a rating, return true
            // otherwise we dont
            headlength={reviewData.head ? reviewData.head.length : 0} // the length of the head
            bodylength={reviewData.body ? reviewData.body.length : 0} // the length of the body
        />
    );
};

export default ReviewPageContainer;
