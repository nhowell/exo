import { SpaceTradersApi } from "../..";

import { IPlaceOrderRequest, IPlaceOrderResponse } from "./types";

export class MyOrdersApiModule {
	constructor(
		private api: SpaceTradersApi,
		private basePath: string,
	) {
		this.placePurchaseOrder = this.placePurchaseOrder.bind(this);
		this.placeSellOrder = this.placeSellOrder.bind(this);
	}

	placePurchaseOrder(
		request: IPlaceOrderRequest,
	): Promise<IPlaceOrderResponse> {
		return this.api.post(this.getMyPurchaseOrdersPath(), request);
	}

	placeSellOrder(request: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
		return this.api.post(this.getMySellOrdersPath(), request);
	}

	private getMyPurchaseOrdersPath() {
		return `${this.basePath}/purchase-orders`;
	}

	private getMySellOrdersPath() {
		return `${this.basePath}/sell-orders`;
	}
}
