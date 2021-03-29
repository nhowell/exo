import { GAME_LOANS_QUERY_KEY } from ".";
import { useSpaceTradersApi } from "../../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../../useSpaceTradersQuery";

export function useAvailableLoans() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(GAME_LOANS_QUERY_KEY, () =>
		spaceTradersApi.game.loans.getAvailableLoans(),
	);
}
