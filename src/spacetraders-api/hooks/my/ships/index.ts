import { MY_QUERY_KEY } from "..";

export const MY_SHIPS_QUERY_KEY = [MY_QUERY_KEY, "ships"];

export function myShipQueryKey(shipId: string): string[] {
	return [...MY_SHIPS_QUERY_KEY, shipId];
}
