import {
	QueryFunction,
	QueryKey,
	useQuery,
	UseQueryOptions,
} from "react-query";
import { SpaceTradersError } from "../api/types";

export function useSpaceTradersQuery<
	TQueryFnData = unknown,
	TData = TQueryFnData
>(
	queryKey: QueryKey,
	queryFn: QueryFunction<TQueryFnData>,
	options?: UseQueryOptions<TQueryFnData, SpaceTradersError, TData>,
) {
	return useQuery<TQueryFnData, SpaceTradersError, TData>(
		queryKey,
		queryFn,
		options,
	);
}
