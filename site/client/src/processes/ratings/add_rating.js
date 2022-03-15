import axios from "axios";

export const addReview = async (user_id, movie_id, reviewData) => {
    return new Promise(resolve => {
        axios
            .post("http://localhost:3001/api/reviews_and_ratings/add", {
                user_id,
                movie_id,
                rating: reviewData.rating,
                review_head: reviewData.head,
                review_body: reviewData.body,
                survey_1: null, // not included in current version so just make null
                survey_2: null,
            })
            .then(response => {
                resolve(response);
            });
    });
};

export const updateReview = async (user_id, movie_id, reviewData) => {
    return new Promise(resolve => {
        axios
            .post("http://localhost:3001/api/reviews_and_ratings/update", {
                user_id,
                movie_id,
                rating: reviewData.rating,
                review_head: reviewData.head,
                review_body: reviewData.body,
                survey_1: null, // not included in current version so just make null
                survey_2: null,
            })
            .then(response => {
                resolve(response);
            });
    });
};
