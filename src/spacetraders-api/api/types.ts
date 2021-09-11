import { IUser } from "./users/types";

export interface IFailureResponse {
	error: IFailureError;
}

export interface IFailureError {
	code: number;
	message: string;
	data?: unknown;
}

export class SpaceTradersError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public code?: number,
	) {
		super(message);
	}
}

export enum HttpStatusCode {
	TooManyRequests = 429,
}

export interface IGameStatusResponse {
	status: string;
}

export interface IClaimUsernameResponse {
	token: string;
	user: IUser;
}

export enum Good {
	BiometricFirearms = "BIOMETRIC_FIREARMS",
	Chemicals = "CHEMICALS",
	ConstructionMaterials = "CONSTRUCTION_MATERIALS",
	ConsumerGoods = "CONSUMER_GOODS",
	Drones = "DRONES",
	Food = "FOOD",
	Electronics = "ELECTRONICS",
	ExoticPlasma = "EXOTIC_PLASMA",
	Explosives = "EXPLOSIVES",
	Fuel = "FUEL",
	FusionReactors = "FUSION_REACTORS",
	Machinery = "MACHINERY",
	Metals = "METALS",
	Nanobots = "NANOBOTS",
	Narcotics = "NARCOTICS",
	PrecisionInstruments = "PRECISION_INSTRUMENTS",
	ProteinSynthesizers = "PROTEIN_SYNTHESIZERS",
	RareMetals = "RARE_METALS",
	Research = "RESEARCH",
	ShipParts = "SHIP_PARTS",
	ShipPlating = "SHIP_PLATING",
	Textiles = "TEXTILES",
	UnstableCompounds = "UNSTABLE_COMPOUNDS",
	ZucoCrystals = "ZUCO_CRYSTALS",
}
