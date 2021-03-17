export interface IUserShip {
	id: string;
	class: string;
	type: string;
	cargo: IShipCargo[];
	manufacturer: string;
	maxCargo: number;
	plating: number;
	spaceAvailable: number;
	speed: number;
	weapons: number;
	location?: string;
	flightPlanId?: string;
}

interface IShipCargo {
	good: string;
	quantity: number;
	totalVolume: number;
}
