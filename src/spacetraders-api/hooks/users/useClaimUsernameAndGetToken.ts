import { SpaceTradersApi } from "../../api";
import { useSpaceTradersMutation } from "../useSpaceTradersMutation";

export function useClaimUsernameAndGetToken() {
	return useSpaceTradersMutation((username: string) =>
		SpaceTradersApi.claimUsernameAndGetToken(username),
	);
}
