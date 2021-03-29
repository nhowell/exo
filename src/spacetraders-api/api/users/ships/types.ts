export interface IPurchaseShipRequest {
	location: string;
	type: string;
}

export interface IGetUserShipsResponse {
	ships: IUserShip[];
}

export interface IGetUserShipResponse {
	ship: IUserShip;
}

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
	x: number;
	y: number;
	location?: string;
	flightPlanId?: string;
}

export interface IShipCargo {
	good: Good;
	quantity: number;
	totalVolume: number;
}

export enum Good {
	Chemicals = "CHEMICALS",
	ConstructionMaterials = "CONSTRUCTION_MATERIALS",
	ConsumerGoods = "CONSUMER_GOODS",
	Food = "FOOD",
	Electronics = "ELECTRONICS",
	ExoticPlasma = "EXOTIC_PLASMA",
	Fuel = "FUEL",
	FusionReactors = "FUSION_REACTORS",
	Machinery = "MACHINERY",
	Metals = "METALS",
	ProteinSynthesizers = "PROTEIN_SYNTHESIZERS",
	RareMetals = "RARE_METALS",
	Research = "RESEARCH",
	ShipParts = "SHIP_PARTS",
	ShipPlating = "SHIP_PLATING",
	Textiles = "TEXTILES",
	UnstableCompounds = "UNSTABLE_COMPOUNDS",
	Workers = "WORKERS",
}
