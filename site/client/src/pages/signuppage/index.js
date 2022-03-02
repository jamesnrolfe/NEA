import React from "react";

import SignUpPage from "./signuppage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPageContainer = () => {
	const [userData, setUserData] = useState({});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const setData = (data) => {
		console.log(data);
		setUserData(data);
		handleMessage("Sign up successful");
		redirectUser();
	};

	const handleError = (message) => {
		setMessage("");
		setError(message);
	};

	const handleMessage = (message) => {
		setError("");
		setMessage(message);
	};

	const redirectUser = () => {
		navigate("/");
	};

	return <SignUpPage submitAction={setData} error={error} message={message} />;
};

export default SignUpPageContainer;
