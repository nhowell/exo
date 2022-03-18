import { SpaceTradersApi } from "../..";
import {
	IGetMyShipResponse,
	IGetMyShipsResponse,
	IJettisonCargoRequest,
	IJettisonCargoResponse,
	IPurchaseShipRequest,
	IPurchaseShipResponse,
	IScrapShipResponse,
	ITransferCargoRequest,
	ITransferCargoResponse,
} from "./types";

export class MyShipsApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {
		this.purchaseShip = this.purchaseShip.bind(this);
		this.getShips = this.getShips.bind(this);
		this.getShip = this.getShip.bind(this);
		this.transferCargo = this.transferCargo.bind(this);
		this.jettisonCargo = this.jettisonCargo.bind(this);
		this.scrapShip = this.scrapShip.bind(this);
		this.getMyShipsPath = this.getMyShipsPath.bind(this);
		this.getMyShipsPath = this.getMyShipsPath.bind(this);
	}

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

	jettisonCargo(
		fromShipId: string,
		request: IJettisonCargoRequest,
	): Promise<IJettisonCargoResponse> {
		return this.api.post(`${this.getMyShipPath(fromShipId)}/jettison`, request);
	}

	scrapShip(shipId: string): Promise<IScrapShipResponse> {
		return this.api.delete(this.getMyShipPath(shipId));
	}

	private getMyShipsPath() {
		return `${this.basePath}/ships`;
	}

	private getMyShipPath(shipId: string) {
		return `${this.getMyShipsPath()}/${shipId}`;
	}
}
