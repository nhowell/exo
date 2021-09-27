import { SpaceTradersApi } from "..";
import {
	IGetLocationsInSystemParams,
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

	private getSystemPath(systemSymbol: string) {
		return `/systems/${systemSymbol}`;
	}
}
