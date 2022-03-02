const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
    // read data from the POST request
    const method = req.body.method; // can be id, name or all
    const fetch = req.body.fetch; // getting the user based on their id
    // if no id is given, then get all users

    let sql = "";
    if (method == "all") {
        // if we are not given an id
        sql = "SELECT user_id, username, age, bio, location FROM user_details"; // just get all users
    } else if (method == "id") {
        // otherwise get the specific user
        sql = "SELECT user_id, username, age, bio, location FROM user_details WHERE user_id = ?";
    } else if (method == "name") {
        sql = "SELECT user_id, username, age, bio, location FROM user_details WHERE username = ?";
    } else {
        console.log("No method found");
    }

    con.query(sql, fetch, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
