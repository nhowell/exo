import { ReactElement, useMemo } from "react";
import { t } from "../../utils/translate";
import { UseSpaceTradersQueryResult } from "../../spacetraders-api/hooks/useSpaceTradersQuery";

export interface ITransformedQueryResultHandlerProps<TData, TTransformedData> {
	queryResult: UseSpaceTradersQueryResult<TData>;
	children: (data: TTransformedData) => ReactElement;
	transformData: (data: TData) => TTransformedData;
	errorText?: string;
}

export function TransformedQueryResultHandler<TData, TTransformedData>({
	queryResult,
	errorText,
	...rest
}: ITransformedQueryResultHandlerProps<TData, TTransformedData>): ReactElement {
	return queryResult.isIdle ? (
		<p>{t("Idle...")}</p>
	) : queryResult.isLoading ? (
		<p>{t("Loading...")}</p>
	) : queryResult.isError ? (
		<p>
			{errorText ?? t(queryResult.error?.message ?? "Something went wrong.")}
		</p>
	) : (
		<QueryResultSuccessHandler {...rest} data={queryResult.data} />
	);
}

interface QueryResultSuccessHandlerProps<TData, TTransformedData>
	extends Pick<
		ITransformedQueryResultHandlerProps<TData, TTransformedData>,
		"children" | "transformData"
	> {
	data: TData;
}

function QueryResultSuccessHandler<TData, TTransformedData>({
	data,
	children,
	transformData,
}: QueryResultSuccessHandlerProps<TData, TTransformedData>): ReactElement {
	const transformedData = useMemo(
		() => transformData(data),
		[data, transformData],
	);

	return children(transformedData);
}
