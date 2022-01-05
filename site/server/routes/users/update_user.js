const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const id = req.body.id; // will be used for determining which user to update
	// data to be updated:
	const username = req.body.username;
	const email = req.body.email;
	const age = req.body.age;
	const bio = req.body.bio;
	const location = req.body.location;
	// this can only update ALL variables at once, so when updating, ALL previous data from that user
	// must be sent through. This shouldn't matter as all the data will be with the client anyway.
	// in fact - having all this data required adds an extra layer of security.
	const sql =
		"UPDATE user_details SET username = ?, email = ?, age = ?, bio = ?, location = ? WHERE user_id = ?";
	con.query(sql, [username, email, age, bio, location, id], (err, result) => {
		if (err) throw err;
		res.send(`Successfully updated user with id: ${id}`);
	});
});

module.exports = router;
