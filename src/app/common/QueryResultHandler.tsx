import { ReactElement } from "react";
import { UseQueryResult } from "react-query";
import { t } from "../../helpers/translate";
import { SpaceTradersError } from "../../spacetraders-api/api/types";

interface IOwnProps<TData> {
	queryResult: UseQueryResult<TData, SpaceTradersError>;
	children: (data: TData) => ReactElement;
}

export function QueryResultHandler<TData>({
	queryResult,
	children,
}: IOwnProps<TData>): ReactElement {
	return queryResult.isIdle ? (
		<p>{t("Idle...")}</p>
	) : queryResult.isLoading ? (
		<p>{t("Loading...")}</p>
	) : queryResult.isError ? (
		<p>{t(queryResult.error?.message ?? "Something went wrong.")}</p>
	) : (
		children(queryResult.data)
	);
}
