import { ShipType } from "@/spacetraders-api/api/enums";

// See: https://discord.com/channels/792864705139048469/1016976560085024860/1017895369604071557
export const shipFuelEfficiencies = new Map<ShipType, number>([
	[ShipType.JackshawI, 4],
	[ShipType.JackshawII, 4],
	[ShipType.ZetraII, 3],
	[ShipType.ZetraIII, 3],
	[ShipType.GravagerI, 4],
	[ShipType.GravagerII, 4],
	[ShipType.GravagerIII, 4],
	[ShipType.ElectrumI, 4],
	[ShipType.ElectrumII, 3],
	[ShipType.ElectrumIII, 3],
	[ShipType.ElectrumIV, 2],
	[ShipType.HermesI, 3],
	[ShipType.HermesII, 3],
	[ShipType.HermesIII, 3],
	[ShipType.TiddalikI, 3],
	[ShipType.DradesI, 4],
	[ShipType.ZatashiI, 2],
	[ShipType.ZatashiII, 2],
]);
