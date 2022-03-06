import React from "react";
import axios from "axios";

import SignUpPage from "./signuppage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hash from "../../processes/other/create_hash"; // md5 hash maker

import { addUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const SignUpPageContainer = () => {
	const [message, setMessage] = useState(""); // store the messages in states
	const [error, setError] = useState("");
	const navigate = useNavigate(); // import for use to redirect

	const dispatch = useDispatch();

	const makeRequest = (data) => {
		axios
			.post("http://localhost:3001/api/users/add", {
				username: data.uname,
				email: data.email,
				pw_hash: hash(data.pword),
				age: null,
				bio: "",
				location: null,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.err) {
					// if we have an error...
					handleError(res.data.msg);
				} else {
					// otherwise we can continue
					handleMessage(res.data.msg);
					axios
						.post("http://localhost:3001/api/users/get", {
							method: "name",
							fetch: data.uname,
						})
						.then((result) => {
							dispatch(
								addUser({
									id: result.data[0].user_id,
									username: result.data[0].username,
									location: result.data[0].location,
									bio: result.data[0].bio,
									age: result.data[0].age,
								})
							);
						});
					redirectUser();
				}
			});
	};

	const handleError = (message) => {
		setMessage(""); // edit the success message
		setError(message);
	};

	const handleMessage = (message) => {
		setError(""); // edit the error message
		setMessage(message);
	};

	const redirectUser = () => {
		// send the user to the homepage
		navigate("/");
	};

	return <SignUpPage submitAction={makeRequest} error={error} message={message} />; // render the page
};

export default SignUpPageContainer;
