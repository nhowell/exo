export enum LoanType {
	Startup = "STARTUP",
}

export enum GoodType {
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

export interface GetAvailableLoanTypesResponse {
	loans: IAvailableLoan[];
}

export interface IAvailableLoan {
	type: LoanType;
	amount: number;
	collateralRequired: boolean;
	rate: number;
	termInDays: number;
}

export interface GetGoodTypesResponse {
	goods: IGoodType[];
}

export interface IGoodType {
	name: string;
	symbol: GoodType;
	volumePerUnit: number;
}
