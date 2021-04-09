import { ComponentType } from "react";
import { generatePath } from "react-router-dom";
import { Home } from "./home/Home";
import { Loans } from "./loans/Loans";
import { Systems } from "./systems/Systems";
import { Market } from "./market/Market";
import { AvailableShips } from "./ships/AvailableShips";
import { ViewShip } from "./ships/ViewShip";
import { ViewSystem } from "./systems/ViewSystem";
import { ViewLocation } from "./systems/locations/ViewLocation";
import { splitSymbol } from "../helpers/splitSymbol";
import { ViewLocationDockedShips } from "./systems/locations/ViewLocationDockedShips";

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
const viewLocationPath = "/systems/:systemSymbol/locations/:locationSymbol";
export const generateViewLocationPath = (symbol: string) => {
	const symbolParts = splitSymbol(symbol);

	return generatePath(viewLocationPath, {
		systemSymbol: symbolParts.systemSymbol,
		locationSymbol: symbolParts.locationSymbolWithoutSystem,
	});
};
const viewLocationDockedShipsPath =
	"/systems/:systemSymbol/locations/:locationSymbol/ships";
export const generateViewLocationDockedShipsPath = (symbol: string) => {
	const symbolParts = splitSymbol(symbol);

	return generatePath(viewLocationDockedShipsPath, {
		systemSymbol: symbolParts.systemSymbol,
		locationSymbol: symbolParts.locationSymbolWithoutSystem,
	});
};
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
		path: viewLocationPath,
		component: ViewLocation,
	},
	{
		path: viewLocationDockedShipsPath,
		component: ViewLocationDockedShips,
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
