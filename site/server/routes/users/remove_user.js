const express = require("express");
const router = express.Router();
const con = require("../../connection");

router.post("/", (req, res) => {
	const id = Number(req.body.id); // we only need the one variable since we are simply removing
	// the user based off of their ID
	// a potential improvement here is adding a layer of security - maybe requiring the pw_hash
	const sql = "DELETE FROM user_details WHERE user_id = ?";
	// now send our request...
	con.query(sql, id, (err, result) => {
		if (err) throw err;
		res.send(`Successfully deleted user with id: ${id}`);
	});
});

module.exports = router;
