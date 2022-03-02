const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
    console.log("Adding user");
    // read all of the data from the POST request
    const username = req.body.username;
    const email = req.body.email;
    const pw_hash = req.body.pw_hash;
    const age = req.body.age;
    const bio = req.body.bio;
    const location = req.body.location;
    // now we need some SQL to actually tell the database what to do
    const sql =
        "INSERT INTO user_details (username, email, pw_hash, age, bio, location) VALUES (?,?,?,?,?,?)";
    // question marks are a security thing - a man in the middle only sees those, not the actual values...
    con.query(sql, [username, email, pw_hash, age, bio, location], (err, result) => {
        // which are inputted instead as a parameter in the query function
        let error = false;
        let message = "Successfully created account";
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                console.log(err);
                error = true;
                message = "Username or email already in use";
            } else {
                error = true;
                message = "Unknown error, check server";
            }
        }
        res.send({
            err: error,
            msg: message,
        }); // else simply send a success message
    });
});

module.exports = router;
