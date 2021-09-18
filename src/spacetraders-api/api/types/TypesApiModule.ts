import { SpaceTradersApi } from "..";
import { GetAvailableLoanTypesResponse, GetGoodTypesResponse } from "./types";

const path = "/types";

export class TypesApiModule {
	constructor(private api: SpaceTradersApi) {}

	getAvailableLoanTypes(): Promise<GetAvailableLoanTypesResponse> {
		return this.api.get(`${path}/loans`);
	}

	getGoodTypes(): Promise<GetGoodTypesResponse> {
		return this.api.get(`${path}/goods`);
	}
}
