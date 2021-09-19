import { SpaceTradersApi } from "..";
import { IGetLocationsInSystemParams, ISystemLocationsResponse } from "./types";

export class SystemsApiModule {
	constructor(private api: SpaceTradersApi) {}

	getLocationsInSystem(
		systemSymbol: string,
		params?: IGetLocationsInSystemParams,
	): Promise<ISystemLocationsResponse> {
		return this.api.get(
			`${this.getSystemPath(systemSymbol)}/locations`,
			params,
		);
	}

	private getSystemPath(systemSymbol: string) {
		return `/systems/${systemSymbol}`;
	}
}
