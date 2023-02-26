import { IAllStringKeyProps } from "@/types";

import { LocationType, LocationTrait, Good } from "../enums";
import { IStructure } from "../structures/types";

export interface IGetLocationResponse {
	location: ILocationDetails;
}

export interface ILocationDetails extends ILocation {
	dockedShips: number;
}

export interface ILocation {
	symbol: string;
	type: LocationType;
	name: string;
	x: number;
	y: number;
	allowsConstruction: boolean;
	traits: LocationTrait[];
	messages?: string[];
}

export interface IGetDockedShipsAtLocationResponse {
	ships: IDockedShip[];
}

export interface IDockedShip extends IAllStringKeyProps {
	shipId: string;
	username: string;
	shipType: string;
}

export interface IGetMarketplaceAtLocationResponse {
	marketplace: IMarketplaceListing[];
}

export interface IMarketplaceListing extends IAllStringKeyProps {
	symbol: Good;
	volumePerUnit: number;
	pricePerUnit: number;
	spread: number;
	purchasePricePerUnit: number;
	sellPricePerUnit: number;
	quantityAvailable: number;
}

export interface IGetStructuresAtLocationResponse {
	structures: IStructure[];
}
