import { SpaceTradersApi } from "../..";
import {
	IGetMyShipResponse,
	IGetMyShipsResponse,
	IPurchaseShipRequest,
	IPurchaseShipResponse,
} from "./types";

export class MyShipsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	purchaseShip(request: IPurchaseShipRequest): Promise<IPurchaseShipResponse> {
		return this.api.post(this.getMyShipsPath(), request);
	}

	getShips(): Promise<IGetMyShipsResponse> {
		return this.api.get(this.getMyShipsPath());
	}

	getShip(shipId: string): Promise<IGetMyShipResponse> {
		return this.api.get(`${this.getMyShipsPath()}/${shipId}`);
	}

	private getMyShipsPath() {
		return `${this.basePath}/ships`;
	}
}
