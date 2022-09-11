import { SpaceTradersApi } from "..";
import {
	IDepositGoodsToStructureRequest,
	IDepositGoodsToStructureResponse,
	IGetStructureResponse,
} from "./types";

export class StructuresApiModule {
	constructor(private api: SpaceTradersApi) {
		this.getStructure = this.getStructure.bind(this);
		this.depositGoodsToStructure = this.depositGoodsToStructure.bind(this);
	}

	getStructure(structureId: string): Promise<IGetStructureResponse> {
		return this.api.get(this.getStructurePath(structureId));
	}

	depositGoodsToStructure(
		structureId: string,
		request: IDepositGoodsToStructureRequest,
	): Promise<IDepositGoodsToStructureResponse> {
		return this.api.post(
			`${this.getStructurePath(structureId)}/deposit`,
			request,
		);
	}

	private getStructurePath(structureId: string) {
		return `/structures/${structureId}`;
	}
}
