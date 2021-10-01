import { SpaceTradersApi } from "..";
import {
	IDepositGoodsToStructureRequest,
	IDepositGoodsToStructureResponse,
	IGetStructureResponse,
} from "./types";

export class StructuresApiModule {
	constructor(private api: SpaceTradersApi) {}

	getStructure(id: string): Promise<IGetStructureResponse> {
		return this.api.get(this.getStructurePath(id));
	}

	depositGoodsToStructure(
		id: string,
		request: IDepositGoodsToStructureRequest,
	): Promise<IDepositGoodsToStructureResponse> {
		return this.api.post(this.getStructurePath(id), request);
	}

	private getStructurePath(id: string) {
		return `/structures/${id}`;
	}
}
