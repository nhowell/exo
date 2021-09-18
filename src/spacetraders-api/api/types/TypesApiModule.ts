import { SpaceTradersApi } from "..";
import { GetAvailableLoanTypesResponse } from "./types";

const path = "/types";

export class TypesApiModule {
	constructor(private api: SpaceTradersApi) {}

	getAvailableLoanTypes(): Promise<GetAvailableLoanTypesResponse> {
		return this.api.get(`${path}/loans`);
	}
}
