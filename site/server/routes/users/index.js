const express = require("express");
const router = express.Router();

// adding users
const addUser = require("./add_user");
router.use("/add", addUser); // now if we go to /users/add, we are accessing our function
// which adds users

module.exports = router;
