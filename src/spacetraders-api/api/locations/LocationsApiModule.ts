import { SpaceTradersApi } from "..";
import {
	IGetDockedShipsAtLocationResponse,
	IGetMarketplaceAtLocationResponse,
	IGetLocationResponse,
	IGetStructuresAtLocationResponse,
} from "./types";

export class LocationsApiModule {
	constructor(private api: SpaceTradersApi) {}

	getLocation(locationSymbol: string): Promise<IGetLocationResponse> {
		return this.api.get(this.getLocationPath(locationSymbol));
	}

	getDockedShipsAtLocation(
		locationSymbol: string,
	): Promise<IGetDockedShipsAtLocationResponse> {
		return this.api.get(`${this.getLocationPath(locationSymbol)}/ships`);
	}

	getMarketplaceAtLocation(
		locationSymbol: string,
	): Promise<IGetMarketplaceAtLocationResponse> {
		return this.api.get(`${this.getLocationPath(locationSymbol)}/marketplace`);
	}

	getStructuresAtLocation(
		locationSymbol: string,
	): Promise<IGetStructuresAtLocationResponse> {
		return this.api.get(`${this.getLocationPath(locationSymbol)}/structures`);
	}

	private getLocationPath(locationSymbol: string) {
		return `/locations/${locationSymbol}`;
	}
}
