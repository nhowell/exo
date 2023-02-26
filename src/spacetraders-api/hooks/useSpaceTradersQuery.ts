import {
	QueryFunction,
	QueryKey,
	useQuery,
	UseQueryOptions,
	UseQueryResult,
} from "react-query";

import { SpaceTradersError } from "../api/types";

export type UseSpaceTradersQueryResult<TData> = UseQueryResult<
	TData,
	SpaceTradersError
>;

export function useSpaceTradersQuery<
	TQueryFnData = unknown,
	TData = TQueryFnData,
>(
	queryKey: QueryKey,
	queryFn: QueryFunction<TQueryFnData>,
	options?: UseQueryOptions<TQueryFnData, SpaceTradersError, TData>,
): UseSpaceTradersQueryResult<TData> {
	return useQuery<TQueryFnData, SpaceTradersError, TData>(
		queryKey,
		queryFn,
		options,
	);
}
