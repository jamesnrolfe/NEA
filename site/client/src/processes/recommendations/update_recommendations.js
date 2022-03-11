import { store } from "../../store";
import { modifyRecommendations } from "../../redux/actions";
import { generateRecommendations } from "./create_recommendations";

export const updateRecommendations = async (user_id) => {
	return new Promise((resolve) => {
		generateRecommendations(user_id).then((recommendations) => {
			store.dispatch(modifyRecommendations(recommendations));
			resolve(recommendations);
		});
	});
};
