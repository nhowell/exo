import { SpaceTradersApi } from "../..";
import { IGetAvailableLoansResponse } from "./types";

export class LoansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getAvailableLoans(): Promise<IGetAvailableLoansResponse> {
		return this.api.get(`${this.basePath}/loans`);
	}
}
