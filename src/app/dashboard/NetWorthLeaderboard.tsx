import { ReactElement, useCallback, useMemo } from "react";
import { LinkButton } from "../../core/buttons/LinkButton";
import { Table } from "../../core/table/Table";
import { ITableColumnHeader } from "../../core/table/types";
import { t } from "../../helpers/translate";
import { IUserNetWorth } from "../../spacetraders-api/api/game/types";
import { useNetWorthLeaderboard } from "../../spacetraders-api/hooks/game/useNetWorthLeaderboard";
import { TimeRemaining } from "../common/TimeRemaining";
import styles from "./NetWorthLeaderboard.module.css";

const columnDefinitions: ITableColumnHeader<IUserNetWorth>[] = [
	{
		keyname: "rank",
		label: t("Rank"),
		format: "number",
		align: "right",
	},
	{
		keyname: "username",
		label: t("Corporation"),
	},
	{
		keyname: "netWorth",
		label: t("Net Worth"),
		format: "credits",
		align: "right",
	},
];

export function NetWorthLeaderboard(): ReactElement {
	const {
		isLoading,
		isError,
		error,
		data,
		dataUpdatedAt,
		refetch,
		isRefetching,
	} = useNetWorthLeaderboard();

	const leaderboard: IUserNetWorth[] | undefined = useMemo(() => {
		if (data === undefined) {
			return undefined;
		}

		const results = [...data.netWorth];

		const currentUsersRow = results.find(
			(x) => x.username === data.userNetWorth.username,
		);

		if (!currentUsersRow) {
			results.push(data.userNetWorth);
		}

		return results;
	}, [data]);

	const isRowForCurrentUser = useCallback(
		(row: IUserNetWorth): boolean =>
			row.username === data?.userNetWorth.username,
		[data?.userNetWorth.username],
	);

	return (
		<>
			<h2>{t("Net Worth Leaderboard")}</h2>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || leaderboard === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : (
				<>
					<Table<IUserNetWorth>
						keyField="username"
						columnDefinitions={columnDefinitions}
						tableData={leaderboard}
						striped
						highlightRow={isRowForCurrentUser}
					/>

					<div className={styles.refresh}>
						<div>
							{t("Last refreshed:")} <TimeRemaining until={dataUpdatedAt} />
						</div>
						<div>
							<LinkButton onClick={() => refetch()} disabled={isRefetching}>
								{isRefetching ? t("Refreshing...") : t("Refresh")}
							</LinkButton>
						</div>
					</div>
				</>
			)}
		</>
	);
}
