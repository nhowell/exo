import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { t } from "../../helpers/translate";
import { useShip } from "../../spacetraders-api/users/ships/getShip";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface IRouteParams {
	shipId: string;
}

export function ViewShip(): ReactElement {
	const { shipId } = useParams<IRouteParams>();
	const currentUser = useCurrentUser();

	const { isLoading, isError, error, data: ship } = useShip(
		currentUser.username,
		shipId,
	);

	return (
		<>
			<h1>{t("View Ship")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || ship === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : (
				<p>
					Ship: {ship.id}
					<br />
					Location: {ship.location}
					<br />
					Flight: {ship.flightPlanId}
				</p>
			)}
		</>
	);
}
