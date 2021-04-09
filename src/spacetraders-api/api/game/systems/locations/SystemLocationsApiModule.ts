import { SpaceTradersApi } from "../../..";
import { IGetLocationsInSystemParams, ISystemLocationsResponse } from "./types";

export class SystemLocationsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getLocationsInSystem(
		systemSymbol: string,
		params?: IGetLocationsInSystemParams,
	): Promise<ISystemLocationsResponse> {
		return this.api.get(this.getSystemLocationsPath(systemSymbol), params);
	}

	private getSystemLocationsPath(symbol: string) {
		return `${this.basePath}/${symbol}/locations`;
	}
}
