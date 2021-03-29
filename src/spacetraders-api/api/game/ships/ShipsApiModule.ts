import { SpaceTradersApi } from "../..";
import { IAvailableShipsResponse } from "./types";

export class ShipsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	getAvailableShips(): Promise<IAvailableShipsResponse> {
		return this.api.get(`${this.basePath}/ships`);
	}
}
