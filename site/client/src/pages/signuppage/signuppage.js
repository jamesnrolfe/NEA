import SignUpForm from "../../components/large/signupform";
import "./signuppage.scss";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { SignUpFields } from "../../constants/accountdata";

const SignUpPage = (props) => {
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true);
	}, []);

	return (
		<div className="SignUpPage">
			<SignUpForm
				title="Sign up"
				type="signup"
				fields={SignUpFields}
				submitAction={props.submitAction}
				message={props.message}
				error={props.error}
				didMount={didMount ? "mounted" : ""}
			/>
			<Link className={`SwapForm ${didMount ? "mounted" : ""}`} to="/login">
				<div>Have an account? Log in instead</div>
			</Link>
		</div>
	);
};

export default SignUpPage;
