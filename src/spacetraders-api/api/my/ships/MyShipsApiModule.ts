import { SpaceTradersApi } from "../..";
import {
	IGetMyShipResponse,
	IGetMyShipsResponse,
	IPurchaseShipRequest,
	IPurchaseShipResponse,
	ITransferCargoRequest,
	ITransferCargoResponse,
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

	transferCargo(
		fromShipId: string,
		request: ITransferCargoRequest,
	): Promise<ITransferCargoResponse> {
		return this.api.post(`${this.getMyShipPath(fromShipId)}/transfer`, request);
	}

	private getMyShipsPath() {
		return `${this.basePath}/ships`;
	}

	private getMyShipPath(shipId: string) {
		return `${this.getMyShipsPath()}/${shipId}`;
	}
}
