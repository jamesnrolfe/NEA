import LoginPage from "./loginpage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPageContainer = () => {
	const [loginData, setLoginData] = useState({});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const setData = (data) => {
		console.log(data);
		setLoginData(data);
		handleMessage("Log in successful"); // placeholder
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

	return <LoginPage submitAction={setData} error={error} message={message} />;
};

export default LoginPageContainer;
