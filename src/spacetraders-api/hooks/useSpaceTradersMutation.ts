import { MutationFunction, useMutation, UseMutationOptions } from "react-query";
import { SpaceTradersError } from "../api/types";

export function useSpaceTradersMutation<
	TData = unknown,
	TVariables = void,
	TContext = unknown,
>(
	mutationFn: MutationFunction<TData, TVariables>,
	options?: UseMutationOptions<TData, SpaceTradersError, TVariables, TContext>,
) {
	return useMutation<TData, SpaceTradersError, TVariables, TContext>(
		mutationFn,
		options,
	);
}
