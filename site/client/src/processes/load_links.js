import axios from "axios";

export const loadLinks = async () => {
	return new Promise((resolve) => {
		axios.post("http://localhost:3001/api/other/get_links").then((result) => {
			resolve(result);
		});
	});
};
