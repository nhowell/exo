import { SpaceTradersApi } from "../..";
import {
	IPlacePurchaseOrderRequest,
	IPlacePurchaseOrderResponse,
} from "./types";

export class MyPurchaseOrdersApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	placePurchaseOrder(
		request: IPlacePurchaseOrderRequest,
	): Promise<IPlacePurchaseOrderResponse> {
		return this.api.post(this.getMyPurchaseOrdersPath(), request);
	}

	private getMyPurchaseOrdersPath() {
		return `${this.basePath}/purchase-orders`;
	}
}
