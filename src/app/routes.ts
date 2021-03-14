import { ComponentType } from "react";
import { Home } from "./home/Home";

interface IRoute {
	path: string;
	component: ComponentType<any>;
}

export const loginPath = "/login";

export const routes: IRoute[] = [
	{
		path: "/",
		component: Home,
	},
];
