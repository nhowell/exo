import { Good } from "../../enums";
import { IMyShip } from "../ships/types";

export interface IPlaceOrderRequest {
	shipId: string;
	good: Good;
	quantity: number;
}

export interface IPlaceOrderResponse {
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
