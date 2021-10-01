import { SpaceTradersApi } from "..";
import {
	IGetAvailableLoanTypesResponse,
	IGetGoodTypesResponse,
	IGetShipTypesResponse,
	IGetStructureTypesResponse,
} from "./types";

const path = "/types";

export class TypesApiModule {
	constructor(private api: SpaceTradersApi) {}

	getAvailableLoanTypes(): Promise<IGetAvailableLoanTypesResponse> {
		return this.api.get(`${path}/loans`);
	}

	getGoodTypes(): Promise<IGetGoodTypesResponse> {
		return this.api.get(`${path}/goods`);
	}

	getShipTypes(): Promise<IGetShipTypesResponse> {
		return this.api.get(`${path}/ships`);
	}

	getStructureTypes(): Promise<IGetStructureTypesResponse> {
		return this.api.get(`${path}/structures`);
	}
}
