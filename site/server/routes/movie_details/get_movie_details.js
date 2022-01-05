const express = require("express");
const router = express.Router();
const con = require("../../connection");

// this is simple - base of id and fetch the details

router.post("/", (req, res) => {
	const id = req.body.id;
	const sql = "SELECT * FROM movie_details WHERE movie_id = ?"; // simple select command

	con.query(sql, id, (err, result) => {
		if (err) throw err;
		res.send(result); // if there is no error send the results
	});
});

module.exports = router;
