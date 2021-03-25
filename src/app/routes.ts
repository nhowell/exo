import { ComponentType } from "react";
import { generatePath } from "react-router-dom";
import { Home } from "./home/Home";
import { Loans } from "./loans/Loans";
import { SystemMap } from "./map/SystemMap";
import { Market } from "./market/Market";
import { AvailableShips } from "./ships/AvailableShips";
import { ViewShip } from "./ships/ViewShip";

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
export const generateViewShipPath = (shipId: string) =>
	generatePath(viewShipPath, {
		shipId: shipId,
	});

const viewShipPath = "/ships/:shipId";

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
	{
		path: viewShipPath,
		component: ViewShip,
	},
];
