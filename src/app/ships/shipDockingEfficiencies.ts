import { ShipType } from "@/spacetraders-api/api/enums";

// See: https://discord.com/channels/792864705139048469/1016976560085024860/1017895369604071557
export const shipDockingEfficiencies = new Map<ShipType, number>([
	[ShipType.JackshawI, 2],
	[ShipType.JackshawII, 2],
	[ShipType.ZetraII, 1],
	[ShipType.ZetraIII, 1],
	[ShipType.GravagerI, 2],
	[ShipType.GravagerII, 3],
	[ShipType.GravagerIII, 4],
	[ShipType.ElectrumI, 2],
	[ShipType.ElectrumII, 1],
	[ShipType.ElectrumIII, 1],
	[ShipType.ElectrumIV, 1],
	[ShipType.HermesI, 1],
	[ShipType.HermesII, 1],
	[ShipType.HermesIII, 1],
	[ShipType.TiddalikI, 4],
	[ShipType.DradesI, 4],
	[ShipType.ZatashiI, 1],
	[ShipType.ZatashiII, 1],
]);
