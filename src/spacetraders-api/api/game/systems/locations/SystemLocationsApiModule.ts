import { SpaceTradersApi } from "../../..";
import { ISystemLocationsResponse } from "./types";

export class SystemLocationsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getLocationsInSystem(
		systemSymbol: string,
	): Promise<ISystemLocationsResponse> {
		return this.api.get(this.getSystemLocationsPath(systemSymbol));
	}

	private getSystemLocationsPath(symbol: string) {
		return `${this.basePath}/${symbol}/locations`;
	}
}
