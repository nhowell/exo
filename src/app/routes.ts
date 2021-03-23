import { ComponentType } from "react";
import { Home } from "./home/Home";
import { Loans } from "./loans/Loans";
import { SystemMap } from "./map/SystemMap";
import { Market } from "./market/Market";
import { AvailableShips } from "./ships/AvailableShips";

interface IRoute {
	path: string;
	component: ComponentType<any>;
}

export const loginPath = "/login";
export const homePath = "/";
export const mapPath = "/map";
export const marketPath = "/market";
export const shipyardPath = "/shipyard";
export const loansPath = "/loans";

export const routes: IRoute[] = [
	{
		path: homePath,
		component: Home,
	},
	{
		path: mapPath,
		component: SystemMap,
	},
	{
		path: marketPath,
		component: Market,
	},
	{
		path: shipyardPath,
		component: AvailableShips,
	},
	{
		path: loansPath,
		component: Loans,
	},
];
