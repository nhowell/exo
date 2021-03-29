import { useContext } from "react";
import { spaceTradersApiContext } from "../../app/SpaceTradersApiProvider";
import { SpaceTradersApi } from "../api";

export function useSpaceTradersApi(): SpaceTradersApi {
	return useContext(spaceTradersApiContext);
}
