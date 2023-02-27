import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LinkButton } from "@/components/buttons/LinkButton";
import { dashboardPath } from "@/routes";
import { IMyDockedShip } from "@/spacetraders-api/api/my/ships/types";
import { useScrapShip } from "@/spacetraders-api/hooks/my/ships/useScrapShip";
import { t } from "@/utils/translate";

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

	const [showConfirmation, setShowConfirmation] = useState(false);

	return (
		<>
			<p>
				{t(
					"Scrapping a ship for credits gives back 25% of its original purchase price.",
				)}
			</p>
			{showConfirmation ? (
				<>
					<p>
						{t(
							"Are you sure? All cargo will be lost and the ship will be destroyed.",
						)}
					</p>
					<button type="button" onClick={handleScrapShip}>
						{t("Yes, scrap ship")}
					</button>{" "}
					{t("or")}{" "}
					<LinkButton onClick={() => setShowConfirmation(false)}>
						{t("Cancel")}
					</LinkButton>
				</>
			) : (
				<LinkButton onClick={() => setShowConfirmation(true)}>
					{t("Scrap ship")}
				</LinkButton>
			)}
			{scrapShip.isError && <p>{scrapShip.error.message}</p>}
		</>
	);
}
