const express = require("express"); // import express to run certain commands
const cors = require("cors"); // need to use this to allow requests from our server
const app = express(); // simplyfying code below
const con = require("../server/connection");

app.use(cors({ origin: "http://localhost:3000" })); // allow requests locally from port 3000 - this depends on what port the
// react development server is running on
app.use(express.json()); // recognises incoming requests as json objects, which helps massively with decoding them
app.use(express.urlencoded({ extended: true })); // recognise incoming requests as strings/arrays

const port = 3001; // what port are we using (doesn't really matter, but 3001 is nice since react generally runs on 3000)

// apps:
const users = require("./routes/users");
app.use("/api/users", users);

const reviewsAndRatings = require("./routes/reviews_and_ratings");
app.use("/api/reviews_and_ratings", reviewsAndRatings);

app.listen(port, () => {
	console.log(`Running on port ${port}`); // when connected, output a success message with the port number
});
