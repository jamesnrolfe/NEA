const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
    const user_id = req.body.user_id;
    const movie_id = req.body.movie_id;

    let sql = "SELECT * FROM user_reviews WHERE movie_id = ? AND user_id = ?";

    con.query(sql, [movie_id, user_id], (err, result) => {
        if (err) throw err;
        res.send(result); // if no error, send the result
    });
});

module.exports = router;
