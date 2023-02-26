import { ReactElement } from "react";
import { useLocation, useParams } from "react-router-dom";
import { t } from "../../utils/translate";
import { useMyShip } from "../../spacetraders-api/hooks/my/ships/useMyShip";
import { ShipStatus } from "./ShipStatus";
import { IMyShip, isDocked } from "../../spacetraders-api/api/my/ships/types";
import { Tag } from "../common/Tag";
import { AtLeastOneTabPane } from "../../core/tabs/types";
import { Tabs } from "../../core/tabs/Tabs";
import { ShipInfo } from "./ShipInfo";
import { ShipCargo } from "./ShipCargo";
import { BuyGoods } from "./BuyGoods";
import { SellGoods } from "./SellGoods";
import { Travel } from "./Travel";
import { QueryResultHandler } from "../common/QueryResultHandler";
import { useShipName } from "./useShipName";

export function ViewShip(): ReactElement {
	const { shipId } = useParams();

	if (shipId === undefined) {
		throw new Error("Missing 'shipId' parameter.");
	}

	const result = useMyShip(shipId);

	const getPanes = (ship: IMyShip): AtLeastOneTabPane => [
		{
			key: "cargo",
			label: t("Cargo"),
			content: <ShipCargo ship={ship} />,
		},
		{
			key: "buy",
			label: t("Buy"),
			content: isDocked(ship) ? (
				<BuyGoods ship={ship} />
			) : (
				<p>{t("Ship is currently in-transit.")}</p>
			),
		},
		{
			key: "sell",
			label: t("Sell"),
			content: isDocked(ship) ? (
				<SellGoods ship={ship} />
			) : (
				<p>{t("Ship is currently in-transit.")}</p>
			),
		},
		{
			key: "travel",
			label: t("Travel"),
			content: isDocked(ship) ? (
				<Travel ship={ship} />
			) : (
				<p>{t("Ship is currently in-transit.")}</p>
			),
		},
		{
			key: "info",
			label: t("Info"),
			content: <ShipInfo ship={ship} />,
		},
	];

	const location = useLocation();

	const shipName = useShipName(shipId);

	return (
		// Set a unique key so that switching between ships resets the state.
		<QueryResultHandler key={shipId} queryResult={result}>
			{(data) => (
				<>
					<header>
						<h1>
							{shipName} <Tag text={data.ship.type} />
						</h1>
					</header>

					<p>
						<ShipStatus ship={data.ship} locationAsLink />.
					</p>

					<Tabs
						panes={getPanes(data.ship)}
						initialActiveTabKey={location.hash.substring(1)}
					/>
				</>
			)}
		</QueryResultHandler>
	);
}
