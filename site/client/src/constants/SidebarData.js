import { MdSettings, MdHome } from "react-icons/md";
import { CgLogIn } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { ImContrast } from "react-icons/im";
import { RiMovie2Fill } from "react-icons/ri";

export const SidebarData = [
	{
		title: "Home",
		path: "/",
		icon: <MdHome />,
		cName: "sidebar-text",
	},
	{
		title: "Search",
		path: "/search",
		icon: <FiSearch />,
		cName: "sidebar-text",
	},
	{
		title: "For you",
		path: "/recommendations",
		icon: <RiMovie2Fill />,
		cName: "sidebar-text",
	},
	{
		title: "Watchlist",
		path: "/watchlist",
		icon: <BsBookmarkFill />,
		cName: "sidebar-text",
	},
	{
		title: "Login",
		path: "/login",
		icon: <CgLogIn />,
		cName: "sidebar-text",
	},
	{
		title: "Settings",
		path: "/settings",
		icon: <MdSettings />,
		cName: "sidebar-text accent",
	},
	{
		title: "Switch Theme",
		event: "switchTheme",
		icon: <ImContrast />,
		cName: "sidebar-text bottom",
	},
];
