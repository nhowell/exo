import { useContext } from "react";

import { SpaceTradersApiContext } from "../../app/SpaceTradersApiProvider";
import { SpaceTradersApi } from "../api";

export function useSpaceTradersApi(): SpaceTradersApi {
	return useContext(SpaceTradersApiContext);
}
