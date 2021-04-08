import { ComponentType } from "react";
import { generatePath } from "react-router-dom";
import { Home } from "./home/Home";
import { Loans } from "./loans/Loans";
import { Systems } from "./systems/Systems";
import { Market } from "./market/Market";
import { AvailableShips } from "./ships/AvailableShips";
import { ViewShip } from "./ships/ViewShip";
import { ViewSystem } from "./systems/ViewSystem";

interface IRoute {
	path: string;
	component: ComponentType<any>;
}

export const loginPath = "/login";
export const homePath = "/";
export const systemsPath = "/systems";
const viewSystemPath = "/systems/:symbol";
export const generateViewSystemPath = (symbol: string) =>
	generatePath(viewSystemPath, {
		symbol,
	});
export const marketPath = "/market";
export const shipyardPath = "/shipyard";
export const loansPath = "/loans";
const viewShipPath = "/ships/:shipId";
export const generateViewShipPath = (shipId: string) =>
	generatePath(viewShipPath, {
		shipId,
	});

export const routes: IRoute[] = [
	{
		path: homePath,
		component: Home,
	},
	{
		path: systemsPath,
		component: Systems,
	},
	{
		path: viewSystemPath,
		component: ViewSystem,
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
