import { SpaceTradersApi } from "..";
import {
	IGetLocationDockedShipsResponse,
	IGetLocationMarketplaceResponse,
	IGetLocationResponse,
} from "./types";

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

	getLocationMarketplace(
		locationSymbol: string,
	): Promise<IGetLocationMarketplaceResponse> {
		return this.api.get(`${this.getLocationPath(locationSymbol)}/marketplace`);
	}

	private getLocationPath(locationSymbol: string) {
		return `/locations/${locationSymbol}`;
	}
}
