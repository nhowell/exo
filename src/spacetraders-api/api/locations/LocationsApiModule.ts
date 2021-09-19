import { SpaceTradersApi } from "..";
import { IGetLocationDockedShipsResponse, IGetLocationResponse } from "./types";

export class LocationsApiModule {
	constructor(private api: SpaceTradersApi) {}

	getLocation(locationSymbol: string): Promise<IGetLocationResponse> {
		return this.api.get(this.getLocationPath(locationSymbol));
	}

	getLocationDockedShips(
		locationSymbol: string,
	): Promise<IGetLocationDockedShipsResponse> {
		return this.api.get(`${this.getLocationPath(locationSymbol)}/ships`);
	}

	private getLocationPath(symbol: string) {
		return `/locations/${symbol}`;
	}
}
