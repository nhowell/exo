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

export enum LoanStatus {
	Current = "CURRENT",
	Paid = "PAID",
	PaidLate = "PAID_LATE",
}

export enum LoanType {
	Startup = "STARTUP",
}

export enum LocationTrait {
	AbundantMetalOres = "ABUNDANT_METAL_ORES",
	AbundantNaturalChemicals = "ABUNDANT_NATURAL_CHEMICALS",
	ArableLand = "ARABLE_LAND",
	Helium3 = "HELIUM_3",
	MetalOres = "METAL_ORES",
	NaturalChemicals = "NATURAL_CHEMICALS",
	SomeArableLand = "SOME_ARABLE_LAND",
	SomeHelium3 = "SOME_HELIUM_3",
	SomeMetalOres = "SOME_METAL_ORES",
	SomeNaturalChemicals = "SOME_NATURAL_CHEMICALS",
	SomeRareMetalOres = "SOME_RARE_METAL_ORES",
	SomeTechnologicalRuins = "SOME_TECHNOLOGICAL_RUINS",
	RareMetalOres = "RARE_METAL_ORES",
	TechnologicalRuins = "TECHNOLOGICAL_RUINS",
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

export enum ShipType {
	JackshawI = "JW-MK-I",
	JackshawII = "JW-MK-II",
	ZetraII = "ZA-MK-II",
	ZetraIII = "ZA-MK-III",
	GravagerI = "GR-MK-I",
	GravagerII = "GR-MK-II",
	GravagerIII = "GR-MK-III",
	ElectrumI = "EM-MK-I",
	ElectrumII = "EM-MK-II", // Not actually sold anywhere
	ElectrumIII = "EM-MK-III",
	ElectrumIV = "EM-MK-IV",
	HermesI = "HM-MK-I",
	HermesII = "HM-MK-II", // Not actually sold anywhere
	HermesIII = "HM-MK-III",
	TiddalikI = "TD-MK-I",
	DradesI = "DR-MK-I",
	ZatashiI = "ZT-MK-I",
	ZatashiII = "ZT-MK-II",
}

export enum ShipClass {
	MKI = "MK-I",
	MKII = "MK-II",
	MKIII = "MK-III",
}

export enum StructureType {
	ChemicalPlant = "CHEMICAL_PLANT",
	DroneFactory = "DRONE_FACTORY",
	ElectronicsFactory = "ELECTRONICS_FACTORY",
	ExplosivesFacility = "EXPLOSIVES_FACILITY",
	FabricationPlant = "FABRICATION_PLANT",
	Farm = "FARM",
	FuelRefinery = "FUEL_REFINERY",
	Mine = "MINE",
	RareEarthMine = "RARE_EARTH_MINE",
	ResearchOutpost = "RESEARCH_OUTPOST",
	Shipyard = "SHIPYARD",
}
