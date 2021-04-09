import { SpaceTradersApi } from "../..";
import { IAvailableShipsResponse, IGetAvailableShipsParams } from "./types";

export class ShipsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getAvailableShips(
		params?: IGetAvailableShipsParams,
	): Promise<IAvailableShipsResponse> {
		return this.api.get(`${this.basePath}/ships`, params);
	}
}
