import { LinkButton } from "../../core/buttons/LinkButton";
import { pluralize } from "../../helpers/pluralize";
import { t } from "../../helpers/translate";
import { useMyShips } from "../../spacetraders-api/hooks/my/ships/useMyShips";
import { QueryResultHandler } from "../common/QueryResultHandler";
import { YourShip } from "./YourShip";
import styles from "./YourShips.module.css";

export function YourShips() {
	const result = useMyShips();

	return (
		<>
			<h1 className={styles.heading}>{t("Your Ships")}</h1>

			<QueryResultHandler queryResult={result}>
				{(data) =>
					data.ships.length === 0 ? (
						<p>{t("You don't own any ships.")}</p>
					) : (
						<>
							<div className={styles.listHeader}>
								<div>{pluralize(data.ships.length, t("ship"), t("ships"))}</div>
								<div>
									<LinkButton
										onClick={() => result.refetch()}
										disabled={result.isRefetching}
									>
										{result.isRefetching ? t("Loading...") : t("Refresh")}
									</LinkButton>
								</div>
							</div>

							<div>
								{data.ships.map((ship) => (
									<YourShip key={ship.id} ship={ship} />
								))}
							</div>
						</>
					)
				}
			</QueryResultHandler>
		</>
	);
}
