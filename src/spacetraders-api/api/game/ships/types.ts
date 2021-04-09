export interface IGetAvailableShipsParams {
	/**
	 * The class of ship to filter by, e.g. "MK-I".
	 */
	class?: string;
}

export interface IAvailableShipsResponse {
	ships: IAvailableShip[];
}

export interface IAvailableShip {
	type: string;
	class: string;
	maxCargo: number;
	speed: number;
	manufacturer: string;
	plating: number;
	weapons: number;
	purchaseLocations: IShipPurchaseLocation[];
}

interface IShipPurchaseLocation {
	location: string;
	price: number;
}
