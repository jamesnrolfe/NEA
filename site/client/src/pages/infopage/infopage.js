import React from "react";
import "./infopage.scss";
import Card from "../../components/small/card";
import Button from "../../components/small/button/button";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

export const InfoPage = props => {
    let genres = []; // the genres we get aren't in a usable form, so we have to make them
    props.details.genres.forEach(genre => {
        genres.push(genre.name);
    });

    let ratingCount = [0, 0, 0, 0, 0]; // initialise our rating count to 0 for each rating
    for (let i = 1; i <= 5; i++) {
        // for all the types of rating
        props.reviews.forEach(review => {
            // for all the ratings
            if (review.rating === i) {
                // if the rating is the one we are looking at
                ratingCount[i - 1] += 1; // increase the count (note 0 indexing adjustment)
            }
        });
        if (props.reviewData.num_ratings != 0) {
            ratingCount[i - 1] = ratingCount[i - 1] / props.reviewData.num_ratings; // this gives the proportion of ratings that each rating has
            // i.e. if there are 2 ratings, and 1 is 4, ratingCount[3] will be 0.5
        } else {
            ratingCount[i - 1] = 0;
        }
    }

    const navigate = useNavigate(); // so we can swap pages with buttons

    return (
        <div className="InfoPage">
            <div className="Title">{props.details.title}</div>
            {/* the title of the page is the movie title */}
            <Button // a button to take you to the reviews page
                className="ReviewButton"
                value="Review"
                color="accent"
                size="large"
                onClick={() => {
                    navigate("/review?id=" + props.details.id);
                }}
            />

            <img // an image of the poster of the movie
                className="Poster"
                src={"https://image.tmdb.org/t/p/w500" + props.details.poster_path}
                alt="not found" // if the poster doesn't exist for whatever reason display an error message
            />
            <div className="Description">{props.details.description}</div>
            {/* display the description of the film */}
            <Card // use our card component
                className="MovieData"
                innerHTML={
                    <div className="MovieDataTable">
                        <div className="Popularity">
                            Popularity: {props.details.popularity.toFixed(0)}
                            {/* the popularity is just a stat from tmdb */}
                        </div>
                        {/* join the genres with a comma */}
                        <div className="Genres">{genres.join(", ")}</div>
                        <div className="Runtime">Runtime: {props.details.runtime} minutes</div>
                    </div>
                }
            />
            <Card
                className="ReviewData"
                innerHTML={
                    <div className="ReviewDataTable">
                        <div className="UserRatingHeader">
                            <div className="Title">User ratings</div>
                            <div className="Stars">
                                <div className="star">
                                    {props.reviewData.average_rating > 1 ? (
                                        // if the average score is greter than 1, we can render a filled star
                                        <AiFillStar />
                                    ) : (
                                        // otherwise render an outline to suggest that we haven't met the criteria
                                        <AiOutlineStar />
                                    )}
                                </div>
                                {/* same for the rest of the stars... */}
                                <div className="star">
                                    {props.reviewData.average_rating > 2 ? (
                                        <AiFillStar />
                                    ) : (
                                        <AiOutlineStar />
                                    )}
                                </div>
                                <div className="star">
                                    {props.reviewData.average_rating > 3 ? (
                                        <AiFillStar />
                                    ) : (
                                        <AiOutlineStar />
                                    )}
                                </div>
                                <div className="star">
                                    {props.reviewData.average_rating > 4 ? (
                                        <AiFillStar />
                                    ) : (
                                        <AiOutlineStar />
                                    )}
                                </div>
                                <div className="star">
                                    {props.reviewData.average_rating > 4.5 ? (
                                        // use 4.5 here because movies will rarely ever be 5 rated
                                        // we get to use the 5th star here
                                        <AiFillStar />
                                    ) : (
                                        <AiOutlineStar />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="AverageRating">
                            {props.reviewData.average_rating} average from{" "}
                            {props.reviewData.num_ratings} ratings
                        </div>
                        <div className="ReviewGraph">
                            {ratingCount.map((rating, i) => {
                                return (
                                    <div className="bar">
                                        <div className="label">
                                            {i + 1} <AiFillStar />
                                            {/* the rating next to a star */}
                                        </div>
                                        <div className="bar-container">
                                            {/* the bar container is constant, but the bar-data below scales based on the proportions */}
                                            <div
                                                className={`bar-data`}
                                                style={{ width: rating * 100 + "%" }}
                                                // we use inline style here for ease, but there is likely a cleaner way to do this. for now it is more than fine
                                            ></div>
                                        </div>
                                        <div className="proportion">
                                            {(rating * 100).toFixed(0)}%
                                            {/* display the percentage next to the bar */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
            />
            <div className="Reviews">
                {props.reviews.map((review, i) => {
                    if (review.review_head || review.review_body) {
                        // if we have either a review head or a review body (or both)
                        // we can render a review down here
                        return (
                            <Card
                                key={i}
                                className="Review"
                                innerHTML={
                                    <div className="ReviewTable">
                                        <div className="Head">{review.review_head}</div>
                                        {/* title of the review */}
                                        <div className="User">{review.username}</div>
                                        {/* give the user who wrote the review */}
                                        <div className="Rating">
                                            {review.rating} <AiFillStar />
                                            {/* give the rating of the review */}
                                        </div>
                                        {/* review body */}
                                        <div className="Body">{review.review_body}</div>
                                    </div>
                                }
                            />
                        );
                    } else {
                        return null; // otherwise we don't want to render the review, since it has no text
                    }
                })}
            </div>
        </div>
    );
};
