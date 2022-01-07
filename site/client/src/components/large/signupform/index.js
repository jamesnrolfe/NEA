import SignUpForm from "./signupform";
import { useState, useEffect, useCallback } from "react";
import { Validation } from "../../../constants/validation"; // import our rules for use

const SignUpFormContainer = (props) => {
	const [info, setInfo] = useState({}); // an object that contains all the entered information
	const [valid, setValid] = useState(false); // is the function ready to be used
	const [validityError, setValidityError] = useState({}); // is there and validity error and if so what is it, stored in an object

	const handleChange = ({ target }) => {
		// when there is an update to a field with the id target
		const { id, value } = target; // seperate the id into the useful components
		if (props.type === "signup") {
			// if the field is a sign up field...
			const [validText, errorMessage] = validateText(id, value); // then validate the text
			// returning with an error message if there is one
			if (validText) {
				// if the text is valid...
				delete validityError[id]; // delete the error associated with it
			} else {
				// but if it the text is not valid
				setValid(false); // make sure that we cant submit
				setValidityError((prevErrors) => ({
					// add an error
					...prevErrors, // all the previous errors +
					[id]: errorMessage, // the new error
				}));
			}
			changeInfo(id, value); // we always want to update the information in the field
		} else if (props.type === "login") {
			// if we are logging in
			changeInfo(id, value); // always change the information in the field
			setValid(checkFilled()); // if we have information filled, we can set it to be valid. Otherwise,
			// we shouldn't be able to submit our data if it is empty
		}
	};

	const validateText = (method, text) => {
		// validation method
		switch (
			method // the method is either of the options below
		) {
			case "uname": // if we are validating a username
				if (text.length < 6) {
					// if our input is less than 6 characters then return an error
					return [false, "Username should be at least 6 characters"];
				} else if (!Validation.acceptableLetters.test(text)) {
					// if we are using unacceptable letters then return an error
					return [false, "Invalid characters"];
				} else {
					// otherwise we are fine
					return [true, "Valid"]; // this would also have to check if the username is already taken or not, which the server does by default
				}
			case "pword": // if we are validating a password
				if (text.length < 8) {
					// if the input length is less than 8 characters then return an error
					return [false, "Password should be at least 8 characters"];
				} else if (!Validation.oneCapitalLetter.test(text)) {
					// if we don't have a capital letter then return an error
					return [false, "Password should contain a capital letter"];
				} else if (!Validation.includesNumber.test(text)) {
					// if we don't have a number then return an error
					return [false, "Password should contain a number"];
				} else {
					return [true, "Valid"]; // otherwise we are fine and can return valid
				}
			case "email": // if we are validating an email
				if (!Validation.email.test(text)) {
					// test against the email validation regex expression
					return [false, "Invalid email"];
				} else {
					// if thats fine we are good
					return [true, "Valid"];
				}
			default:
				return [false, "Unknown method"]; // method error
		}
	};

	const changeInfo = (id, value) => {
		// updating the state with the field info
		setInfo((prevInfo) => ({
			...prevInfo, // all the data that already existed
			[id]: value, // and the new stuff
		}));
	};

	const checkFilled = useCallback(() => {
		// checking if we have all fields full
		return Object.keys(info).length === props.fields.length;
	}, [info, props.fields.length]); // will run when the info is changed

	const handleSubmit = () => {
		// when the submit button is pressed
		props.submitAction(info); // run the given prop
	};

	useEffect(() => {
		if (!checkFilled()) {
			return; // if not all fields have been filled, it cant be valid
		}
		for (const key in info) {
			// for all our keys in our info object
			const v = validateText(key, info[key]);
			if (!v[0]) {
				// if the text isnt valid then end the function as we haven't done good enough
				return;
			}
		}
		setValid(true); // otherwise we are good and valid
	}, [checkFilled, info]); // dependent on checkFilled function, will only run when that is run and the same with info being updated

	return (
		<SignUpForm
			title={props.title}
			input={info}
			fields={props.fields}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			alert={props.message !== "" ? props.message : props.error}
			alertType={props.message !== "" ? "message" : "error"}
			didMount={props.didMount}
			valid={valid}
			validityError={validityError}
		/>
	);
};

export default SignUpFormContainer;
