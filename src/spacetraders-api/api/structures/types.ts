import { Good } from "../enums";
import { IMyShip } from "../my/ships/types";

export interface IGetStructureResponse {
	structure: IStructure;
}

export interface IStructure {
	id: string;
	name: string;
	completed: boolean;
	materials: IStructureMaterial[];
	stability: number;
}

export interface IStructureMaterial {
	good: Good;
	quantity: number;
	targetQuantity: number;
}

export interface IDepositGoodsToStructureRequest {
	shipId: string;
	good: Good;
	quantity: number;
}

export interface IDepositGoodsToStructureResponse {
	deposit: {
		good: Good;
		quantity: number;
	};
	structure: IStructure;
	ship: IMyShip;
}
