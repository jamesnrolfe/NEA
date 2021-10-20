const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
    // read all of the data from the POST request
    const username = req.body.username;
    const email = req.body.email;
    const pw_hash = req.body.pw_hash;
    const age = req.body.age;
    const bio = req.body.bio;
    const location = req.body.location;
    // now we need some SQL to actually tell the database what to do
    const sql = "
        INSERT INTO user_details (username, email, pw_hash, age, bio, location) VALUES (?,?,?,?,?,?)";
    // question marks are a security thing - a man in the middle only sees those, not the actual values...
    con.query(sql, [username, email, pw_hash, age, bio, location], (err, result) => {
        // which are inputted instead as a parameter in the query function
        if (err) throw err; // if we get an error, alert the server
        res.send(`Successfully created user ${username}`); // else simply send a success message
    })
})

router.get("/get", (req, res) => {
    res.send("get method");
});

module.exports = router;