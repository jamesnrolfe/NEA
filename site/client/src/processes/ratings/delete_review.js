import axios from "axios";

export const deleteReview = (user_id, movie_id) => {
    return new Promise(resolve => {
        axios
            .post("http://localhost:3001/api/reviews_and_ratings/remove", {
                user_id,
                movie_id,
            })
            .then(result => {
                resolve(result);
            });
    });
};
