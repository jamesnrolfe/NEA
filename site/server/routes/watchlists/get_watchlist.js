const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const id = req.body.id; // will be used to fetch the user

	const sql = "SELECT movie_id FROM user_watchlists WHERE user_id = ?"; // simple select statement

	con.query(sql, id, (err, result) => {
		if (err) throw err;
		res.send(result); // if no error, this should be an array of watchlist items
	});
});

module.exports = router;
