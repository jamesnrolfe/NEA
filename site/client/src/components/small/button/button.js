import "./button.scss"; // import the css file

const Button = (props) => {
	return (
		<button
			className={`Button ${props.className} ${props.size} ${props.color} ${
				props.disabled ? "disabled" : ""
			}`}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.value}
		</button>
	);
};

export default Button; // export to be used by container
