import axios from "axios";

export const getReview = (user_id, movie_id) => {
    return new Promise(resolve => {
        axios
            .post("http://localhost:3001/api/reviews_and_ratings/get_single", {
                user_id,
                movie_id,
            })
            .then(result => {
                resolve(result);
            });
    });
};
