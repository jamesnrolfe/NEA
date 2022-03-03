const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
    const id = req.body.user_id; // we will use the user id to determine what to return

    const sql1 =
        "SELECT movie_1_id, movie_2_id, correlation_score FROM movie_correlations WHERE movie_1_id IN (SELECT movie_id FROM user_reviews WHERE user_id = ? AND rating > 2)";
    // if the movie is in the list of movies, we can get the correlation data for it
    con.query(sql1, id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
