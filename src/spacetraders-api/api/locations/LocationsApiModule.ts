import { SpaceTradersApi } from "..";
import {
	IGetDockedShipsAtLocationResponse,
	IGetMarketplaceAtLocationResponse,
	IGetLocationResponse,
	IGetStructuresAtLocationResponse,
} from "./types";

export class LocationsApiModule {
	constructor(private api: SpaceTradersApi) {
		this.getLocation = this.getLocation.bind(this);
		this.getDockedShipsAtLocation = this.getDockedShipsAtLocation.bind(this);
		this.getMarketplaceAtLocation = this.getMarketplaceAtLocation.bind(this);
		this.getStructuresAtLocation = this.getStructuresAtLocation.bind(this);
		this.getStructuresAtLocation = this.getStructuresAtLocation.bind(this);
	}

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
