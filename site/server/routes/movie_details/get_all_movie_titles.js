const express = require("express");
const router = express.Router();
const con = require("../../connection");

// this is simple - base of id and fetch the details

router.post("/", (req, res) => {
	const sql = "SELECT movie_id, title FROM movie_details"; // simple select command

	con.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result); // if there is no error send the results
	});
});

module.exports = router;
