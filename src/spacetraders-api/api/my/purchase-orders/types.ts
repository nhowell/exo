import { Good } from "../../enums";
import { IMyShip } from "../ships/types";

export interface IPlacePurchaseOrderRequest {
	shipId: string;
	good: Good;
	quantity: number;
}

export interface IPlacePurchaseOrderResponse {
	credits: number;
	order: IOrder;
	ship: IMyShip;
}

interface IOrder {
	good: Good;
	quantity: number;
	pricePerUnit: number;
	total: number;
}
