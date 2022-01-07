import "./sidebar.scss";
import { SidebarData } from "../../../constants/SidebarData";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
	return (
		<div className={props.className}>
			{/* doesn't really matter but this probably doesn't need a className prop since there is only ever
    one of these and it will always have the same className, but it doesn't matter */}
			<ul className="sidebar-list">
				<div className="ToggleSidebar" onClick={props.hide}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
					</svg>{" "}
					{/* this is just a logo svg from the link shown above */}
				</div>
				{SidebarData.map((item, index) => {
					// create items in the list with the data from the file
					return (
						<li key={index} className={item.cName}>
							{/* give each item a key and the classname defined in the file */}
							{item.event ? ( // if the item has an event then...
								<div
									onClick={item.event === "switchTheme" ? props.switchTheme : " "} // this can only be a switchTheme
									// so give it to it
								>
									{item.icon}
									<span>{item.title}</span>
								</div>
							) : (
								// ...otherwise just give it the relevant props with a link to the defined path
								<Link to={item.path} onClick={props.hide}>
									{item.icon}
									<span>{item.title}</span>
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar; // export to the container element
