const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const sql = "SELECT movie_id, tmdb_id FROM movie_links";

	con.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result); // should be a 2d array containing movie id and tmdb id
	});
});

module.exports = router;
