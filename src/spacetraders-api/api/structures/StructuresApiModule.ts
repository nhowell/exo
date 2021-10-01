import { SpaceTradersApi } from "..";
import {
	IDepositGoodsToStructureRequest,
	IDepositGoodsToStructureResponse,
	IGetStructureResponse,
} from "./types";

export class StructuresApiModule {
	constructor(private api: SpaceTradersApi) {}

	getStructure(structureId: string): Promise<IGetStructureResponse> {
		return this.api.get(this.getStructurePath(structureId));
	}

	depositGoodsToStructure(
		structureId: string,
		request: IDepositGoodsToStructureRequest,
	): Promise<IDepositGoodsToStructureResponse> {
		return this.api.post(this.getStructurePath(structureId), request);
	}

	private getStructurePath(structureId: string) {
		return `/structures/${structureId}`;
	}
}
