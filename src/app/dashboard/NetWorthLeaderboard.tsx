import { ReactElement, useCallback } from "react";

import { LinkButton } from "@/components/buttons/LinkButton";
import { Table } from "@/components/table/Table";
import { ITableColumnHeader } from "@/components/table/types";
import { TimeSince } from "@/components/TimeSince";
import { TransformedQueryResultHandler } from "@/components/TransformedQueryResultHandler";
import {
	INetWorthLeaderboardResponse,
	IUserNetWorth,
} from "@/spacetraders-api/api/game/types";
import { useNetWorthLeaderboard } from "@/spacetraders-api/hooks/game/useNetWorthLeaderboard";
import { t } from "@/utils/translate";

import styles from "./NetWorthLeaderboard.module.css";

const columnDefinitions: ITableColumnHeader<IUserNetWorth>[] = [
	{
		keyName: "rank",
		label: t("Rank"),
		format: "number",
		align: "right",
	},
	{
		keyName: "username",
		label: t("Corporation"),
	},
	{
		keyName: "netWorth",
		label: t("Net Worth"),
		format: "credits",
		align: "right",
	},
];

export function NetWorthLeaderboard(): ReactElement {
	const result = useNetWorthLeaderboard();

	const isRowForCurrentUser = useCallback(
		(row: IUserNetWorth): boolean =>
			row.username === result.data?.userNetWorth.username,
		[result.data?.userNetWorth.username],
	);

	return (
		<>
			<h2>{t("Net Worth Leaderboard")}</h2>
			<TransformedQueryResultHandler
				queryResult={result}
				transformData={transformData}
			>
				{(leaderboard) => (
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
								{t("Last refreshed:")}{" "}
								<TimeSince since={result.dataUpdatedAt} />
							</div>
							<div>
								<LinkButton
									onClick={() => result.refetch()}
									disabled={result.isRefetching}
								>
									{result.isRefetching ? t("Refreshing...") : t("Refresh")}
								</LinkButton>
							</div>
						</div>
					</>
				)}
			</TransformedQueryResultHandler>
		</>
	);
}

function transformData(data: INetWorthLeaderboardResponse): IUserNetWorth[] {
	return addCurrentUser(data.netWorth, data.userNetWorth);
}

function addCurrentUser(
	leaderboard: IUserNetWorth[],
	currentUser: IUserNetWorth,
): IUserNetWorth[] {
	const results = [...leaderboard];

	const currentUsersRow = results.find(
		(x) => x.username === currentUser.username,
	);

	if (!currentUsersRow) {
		results.push(currentUser);
	}

	return results;
}
