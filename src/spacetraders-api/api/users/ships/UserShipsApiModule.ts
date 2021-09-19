import { SpaceTradersApi } from "../..";
import {
	IGetUserShipResponse,
	IGetUserShipsResponse,
	IPurchaseShipRequest,
	IPurchaseShipResponse,
} from "./types";

export class UserShipsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	purchaseShip(request: IPurchaseShipRequest): Promise<IPurchaseShipResponse> {
		return this.api.post(this.getUserShipsPath(), request);
	}

	getShips(): Promise<IGetUserShipsResponse> {
		return this.api.get(this.getUserShipsPath());
	}

	getShip(shipId: string): Promise<IGetUserShipResponse> {
		return this.api.get(`${this.getUserShipsPath()}/${shipId}`);
	}

	private getUserShipsPath() {
		return `${this.basePath}/ships`;
	}
}
