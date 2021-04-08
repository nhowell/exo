export interface ILocation {
	symbol: string;
	type: LocationType;
	name: string;
	x: number;
	y: number;
	ships: unknown[]; // TODO
	messages?: string[];
}

export enum LocationType {
	Anomaly = "ANOMALY",
	Asteroid = "ASTEROID",
	GasGiant = "GAS_GIANT",
	Moon = "MOON",
	Nebula = "NEBULA",
	Planet = "PLANET",
	Wormhole = "WORMHOLE",
}
