import { SpaceTradersApi } from "..";
import {
	IGetLocationDockedShipsResponse,
	IGetLocationMarketplaceResponse,
	IGetLocationResponse,
	IGetLocationStructuresResponse,
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

	getLocationStructures(
		locationSymbol: string,
	): Promise<IGetLocationStructuresResponse> {
		return this.api.get(`${this.getLocationPath(locationSymbol)}/structures`);
	}

	private getLocationPath(locationSymbol: string) {
		return `/locations/${locationSymbol}`;
	}
}
