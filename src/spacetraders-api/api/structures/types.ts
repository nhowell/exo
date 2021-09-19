import { Good } from "../enums";

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
