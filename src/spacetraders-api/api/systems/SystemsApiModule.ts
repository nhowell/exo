import { SpaceTradersApi } from "..";
import {
	IGetAvailableShipsInSystemParams,
	IGetLocationsInSystemParams,
	ISystemAvailableShipsResponse,
	ISystemLocationsResponse,
	ISystemResponse,
} from "./types";

export class SystemsApiModule {
	constructor(private api: SpaceTradersApi) {}

	getSystemInfo(systemSymbol: string): Promise<ISystemResponse> {
		return this.api.get(this.getSystemPath(systemSymbol));
	}

	getLocationsInSystem(
		systemSymbol: string,
		params?: IGetLocationsInSystemParams,
	): Promise<ISystemLocationsResponse> {
		return this.api.get(
			`${this.getSystemPath(systemSymbol)}/locations`,
			params,
		);
	}

	getAvailableShipsInSystem(
		systemSymbol: string,
		params?: IGetAvailableShipsInSystemParams,
	): Promise<ISystemAvailableShipsResponse> {
		return this.api.get(
			`${this.getSystemPath(systemSymbol)}/ship-listings`,
			params,
		);
	}

	private getSystemPath(systemSymbol: string) {
		return `/systems/${systemSymbol}`;
	}
}
