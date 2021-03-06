import axios from "axios";

export const spaceTradersApi = axios.create({
	baseURL: "https://api.spacetraders.io",
});
