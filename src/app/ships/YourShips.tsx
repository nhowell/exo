import { pluralize } from "../../helpers/pluralize";
import { t } from "../../helpers/translate";
import { useShips } from "../../spacetraders-api/hooks/users/ships/useShips";
import { YourShip } from "./YourShip";
import styles from "./YourShips.module.css";

export function YourShips() {
	const { isLoading, isError, error, data, refetch } = useShips();

	return (
		<>
			<h1 className={styles.heading}>{t("Your Ships")}</h1>

			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || data === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : data.ships.length === 0 ? (
				<p>{t("You don't own any ships.")}</p>
			) : (
				<>
					<div className={styles.listHeader}>
						<div>{pluralize(data.ships.length, t("ship"), t("ships"))}</div>
						<div>
							<button type="button" onClick={() => refetch()}>
								Refresh
							</button>
						</div>
					</div>

					<div>
						{data.ships.map((ship) => (
							<YourShip key={ship.id} ship={ship} />
						))}
					</div>
				</>
			)}
		</>
	);
}
