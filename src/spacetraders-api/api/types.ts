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
	user: INewUser;
}

export interface INewUser {
	id: string;
	username: string;
	picture: unknown | null;
	email: string | null;
	credits: number;
	createdAt: string;
	updatedAt: string;
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
