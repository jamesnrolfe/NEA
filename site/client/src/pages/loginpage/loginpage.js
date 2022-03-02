import React from "react";

import LoginForm from "../../components/large/signupform";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./loginpage.scss";
import { LoginFields } from "../../constants/accountdata";

const LoginPage = (props) => {
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true); // for animations on load
	}, []);

	return (
		<div className="LoginPage">
			<LoginForm
				title="Log in"
				type="login"
				fields={LoginFields}
				submitAction={props.submitAction}
				message={props.message}
				error={props.error}
				didMount={didMount ? "mounted" : ""}
			/>
			<Link className={`SwapForm ${didMount ? "mounted" : ""}`} to="/signup">
				<div>Don't have an account? Register instead</div>
			</Link>
		</div>
	);
};

export default LoginPage;
