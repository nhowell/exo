import { pluralize } from "../../helpers/pluralize";
import { t } from "../../helpers/translate";
import { useShips } from "../../spacetraders-api/hooks/users/ships/useShips";
import { YourShip } from "./YourShip";
import styles from "./YourShips.module.css";

export function YourShips() {
	const { isLoading, isError, error, data } = useShips();

	return (
		<>
			<h1 className={styles.heading}>{t("Your Fleet")}</h1>

			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || data === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : data.ships.length === 0 ? (
				<p>{t("You don't own any ships.")}</p>
			) : (
				<>
					<p>{pluralize(data.ships.length, t("ship"), t("ships"))}</p>

					<div className={styles.shipList}>
						{data.ships.map((ship) => (
							<YourShip key={ship.id} ship={ship} />
						))}
					</div>
				</>
			)}
		</>
	);
}
