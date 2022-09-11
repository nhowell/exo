import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "../../helpers/translate";
import { IMyDockedShip } from "../../spacetraders-api/api/my/ships/types";
import { useScrapShip } from "../../spacetraders-api/hooks/my/ships/useScrapShip";
import { dashboardPath } from "../routes";

interface IOwnProps {
	ship: IMyDockedShip;
}

export function ScrapShip(props: IOwnProps): ReactElement {
	const scrapShip = useScrapShip();

	const navigate = useNavigate();

	const handleScrapShip = () => {
		scrapShip.mutate(props.ship.id, {
			onSuccess: () => {
				navigate(dashboardPath, { replace: true });
			},
		});
	};

	return (
		<>
			<p>
				{t(
					"Scrapping a ship for credits gives back 25% of its original purchase price. Any cargo will be lost and the ship will be destroyed.",
				)}
			</p>
			<button type="button" onClick={handleScrapShip}>
				{t("Scrap ship")}
			</button>
			{scrapShip.isError && <p>{scrapShip.error.message}</p>}
		</>
	);
}
