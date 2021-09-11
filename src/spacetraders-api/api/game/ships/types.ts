export interface IGetAvailableShipsParams {
	/**
	 * The class of ship to filter by, e.g. "MK-I".
	 */
	class?: ShipClass;
}

export interface IAvailableShipsResponse {
	ships: IAvailableShip[];
}

export interface IAvailableShip {
	type: string;
	class: ShipClass;
	maxCargo: number;
	speed: number;
	manufacturer: string;
	plating: number;
	weapons: number;
	purchaseLocations: IShipPurchaseLocation[];
}

interface IShipPurchaseLocation {
	system: string;
	location: string;
	price: number;
}

enum ShipClass {
	MKI = "MK-I",
	MKII = "MK-II",
	MKIII = "MK-III",
}
