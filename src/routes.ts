import { ComponentType } from "react";
import { generatePath } from "react-router-dom";

import { splitSymbol } from "@/utils/splitSymbol";

import { Dashboard } from "./app/dashboard/Dashboard";
import { Loans } from "./app/loans/Loans";
import { ViewShip } from "./app/ships/ViewShip";
import { ViewLocation } from "./app/systems/locations/ViewLocation";
import { Systems } from "./app/systems/Systems";
import { ViewSystem } from "./app/systems/ViewSystem";

interface IRoute {
	path: string;
	component: ComponentType<unknown>;
}

export const loginPath = "/login";
export const dashboardPath = "/";
export const systemsPath = "/systems";
const viewSystemPath = "/systems/:systemSymbol";
export const generateViewSystemPath = (systemSymbol: string) =>
	generatePath(viewSystemPath, {
		systemSymbol,
	});
export const viewSystemMapPath = "/systems/:systemSymbol/map";
export const generateViewSystemMapPath = (systemSymbol: string) =>
	generatePath(viewSystemMapPath, {
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
export const loansPath = "/loans";
const viewShipPath = "/ships/:shipId";
export const generateViewShipPath = (shipId: string) =>
	generatePath(viewShipPath, {
		shipId,
	});

export const routes: IRoute[] = [
	{
		path: dashboardPath,
		component: Dashboard,
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
		path: loansPath,
		component: Loans,
	},
	{
		path: viewShipPath,
		component: ViewShip,
	},
];
