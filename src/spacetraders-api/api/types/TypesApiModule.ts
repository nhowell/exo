import { SpaceTradersApi } from "..";
import {
	GetAvailableLoanTypesResponse,
	GetGoodTypesResponse,
	GetShipTypesResponse,
} from "./types";

const path = "/types";

export class TypesApiModule {
	constructor(private api: SpaceTradersApi) {}

	getAvailableLoanTypes(): Promise<GetAvailableLoanTypesResponse> {
		return this.api.get(`${path}/loans`);
	}

	getGoodTypes(): Promise<GetGoodTypesResponse> {
		return this.api.get(`${path}/goods`);
	}

	getShipTypes(): Promise<GetShipTypesResponse> {
		return this.api.get(`${path}/ships`);
	}

	getStructureTypes(): Promise<GetGoodTypesResponse> {
		return this.api.get(`${path}/structures`);
	}
}
