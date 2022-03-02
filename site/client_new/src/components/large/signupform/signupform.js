import React from "react";
import "./signupform.scss";
import Card from "../../small/card";
import Button from "../../small/button";

const SignUpForm = (props) => {
	return (
		<Card // render our card
			className={`SignUpForm ${props.didMount}`}
			innerHTML={
				// with the fiollowing data inside
				<React.Fragment>
					<div className="Title">{props.title}</div>
					{/* what is our field going to be called so that the user can see what they are doing */}
					{props.fields.map((field, i) => {
						// map all the items in the field to a "row" or an input etc.
						return (
							<div
								key={`field_${i}`} // <-- just so react knows how to order it when it renders, not relevant to the code
								className={`Field ${
									props.validityError[field.id] ? "invalid" : ""
								}`} // if it is invalid we want different css, so we need to make the classname reflect that
							>
								<input // our input part
									type={field.type} // this is almost certianly an input
									id={field.id} // so the logic function knows what data it is dealing with
									value={props.input[i]} // takes the input array - this is what is in and is updated by the changeInfo funciton
									// in the container component
									onChange={props.handleChange} // when there is an edit, we need to know in the container function
									autoComplete="off" // dont autocomplete - just a thing because google is annoying with this on
									placeholder={field.label} // what do we have when there is no text - just tells the user what each field does
								/>
								{
									<div className="ValidityMethod">
										{props.validityError[field.id]}
									</div>
								}
							</div>
						);
					})}
					<Button
						className="Submit" // our submit button
						value={props.title} // the same as at the top. It just seemed to make sense to do that
						onClick={props.handleSubmit} // the function given in to deal with the user submitting something
						color="" // leave default
						size="medium"
						disabled={!props.valid} // if we are not valid, then disable the button
					/>
					<div className={`Alert ${props.alertType}`}>{props.alert}</div>{" "}
					{/* an alert at the bottom for anything that the user needs
                    to know that isnt a format error, i.e. "that username is already taken" */}
				</React.Fragment>
			}
		/>
	);
};

export default SignUpForm;
