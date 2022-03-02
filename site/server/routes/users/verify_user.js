const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
    const username = req.body.username;
    const pw_hash = req.body.pw_hash; // need hashed pw

    const sql = "SELECT user_id FROM user_details WHERE username = ? AND pw_hash = ?";

    con.query(sql, [username, pw_hash], (err, result) => {
        res.send(result); // return relevant data
    });
});

module.exports = router;
