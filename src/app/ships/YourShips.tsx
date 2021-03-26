import { pluralize } from "../../helpers/pluralize";
import { t } from "../../helpers/translate";
import { useShips } from "../../spacetraders-api/users/ships/getShips";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { YourShip } from "./YourShip";
import styles from "./YourShips.module.css";

export function YourShips() {
	const currentUser = useCurrentUser();

	const { isLoading, isError, error, data: ships } = useShips(
		currentUser.username,
	);

	return (
		<>
			<h1 className={styles.heading}>{t("Your Fleet")}</h1>

			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || ships === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : ships.length === 0 ? (
				<p>{t("You don't own any ships.")}</p>
			) : (
				<>
					<p>{pluralize(ships.length, t("ship"), t("ships"))}</p>

					<div className={styles.shipList}>
						{ships.map((ship) => (
							<YourShip key={ship.id} ship={ship} />
						))}
					</div>
				</>
			)}
		</>
	);
}
