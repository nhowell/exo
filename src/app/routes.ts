import { ComponentType } from "react";
import { generatePath } from "react-router-dom";
import { Home } from "./home/Home";
import { Loans } from "./loans/Loans";
import { Systems } from "./systems/Systems";
import { Market } from "./market/Market";
import { ViewShip } from "./ships/ViewShip";
import { ViewSystem } from "./systems/ViewSystem";
import { ViewLocation } from "./systems/locations/ViewLocation";
import { splitSymbol } from "../helpers/splitSymbol";

interface IRoute {
	path: string;
	component: ComponentType<any>;
}

export const loginPath = "/login";
export const homePath = "/";
export const systemsPath = "/systems";
const viewSystemPath = "/systems/:systemSymbol";
export const generateViewSystemPath = (systemSymbol: string) =>
	generatePath(viewSystemPath, {
		systemSymbol,
	});
const viewLocationPath = "/systems/:systemSymbol/locations/:locationSymbol";
export const generateViewLocationPath = (symbol: string) => {
	const symbolParts = splitSymbol(symbol);

	return generatePath(viewLocationPath, {
		systemSymbol: symbolParts.systemSymbol,
		locationSymbol: symbolParts.locationSymbolWithoutSystem,
	});
};
export const marketPath = "/market";
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
		path: viewLocationPath,
		component: ViewLocation,
	},
	{
		path: marketPath,
		component: Market,
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
