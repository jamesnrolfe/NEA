const mysql = require("mysql"); // import the mysql package containing information about how to create a connection

const db = mysql.createConnection({
	// create the connection with the database
	// database connection settings
	host: "localhost", // the database is hosted locally
	user: "root",
	password: "",
	database: "nea",
});

db.connect((err) => {
	if (err) throw err; // if there is an error, throw it (causing the program to halt)
	console.log("Connected to database"); // otherwise simply output a message saying that we have connected to the database
});

module.exports = db; // export this connection so that other files can make use of it
