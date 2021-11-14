const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	// read data from the POST request
	const id = req.body.id; // getting the user based on their id
	// if no id is given, then get all users

	let sql = "";
	if (id == null) {
		// if we are not given an id
		sql = "SELECT user_id, username, age, bio, location FROM user_details"; // just get all users
	} else {
		// otherwise get the specific user
		sql = "SELECT user_id, username, age, bio, location FROM user_details WHERE user_id = ?";
	}

	con.query(sql, id, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

module.exports = router;
