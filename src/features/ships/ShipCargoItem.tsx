import { ReactElement, useState } from "react";

import { ActionButtons } from "@/components/ActionButtons";
import { LinkButton } from "@/components/buttons/LinkButton";
import { Tile } from "@/components/tiles/Tile";
import {
	IMyShip,
	isDocked,
	IShipCargo,
} from "@/spacetraders-api/api/my/ships/types";
import { numberFormat } from "@/utils/numberFormat";
import { titleCase } from "@/utils/titleCase";
import { t } from "@/utils/translate";

import { JettisonCargo } from "./JettisonCargo";
import { TransferCargo } from "./TransferCargo";

interface IOwnProps {
	ship: IMyShip;
	cargoItem: IShipCargo;
}

export function ShipCargoItem(props: IOwnProps): ReactElement {
	const [action, setAction] = useState<null | "transfer" | "jettison">(null);

	// Unset the "transfer" action if the ship is no longer docked.
	if (action === "transfer" && !isDocked(props.ship)) {
		setAction(null);
	}

	return (
		<Tile width="28.5rem">
			<h3>{t(titleCase(props.cargoItem.good))}</h3>
			<dl>
				<div>
					<dt>{t("Quantity")}:</dt>
					<dd>{numberFormat(props.cargoItem.quantity)}</dd>
				</div>
				<div>
					<dt>{t("Volume per Unit")}:</dt>
					<dd>
						{numberFormat(
							props.cargoItem.totalVolume / props.cargoItem.quantity,
						)}
					</dd>
				</div>
				<div>
					<dt>{t("Total Volume")}:</dt>
					<dd>{numberFormat(props.cargoItem.totalVolume)}</dd>
				</div>
			</dl>

			{action === "jettison" && (
				<JettisonCargo
					ship={props.ship}
					cargoItem={props.cargoItem}
					onCancel={() => setAction(null)}
				/>
			)}

			{action === "transfer" && isDocked(props.ship) && (
				<TransferCargo
					ship={props.ship}
					cargoItem={props.cargoItem}
					onCancel={() => setAction(null)}
				/>
			)}

			{action === null && (
				<ActionButtons>
					{isDocked(props.ship) && (
						<LinkButton onClick={() => setAction("transfer")}>
							{t("Transfer")}
						</LinkButton>
					)}
					<LinkButton onClick={() => setAction("jettison")}>
						{t("Jettison")}
					</LinkButton>
				</ActionButtons>
			)}
		</Tile>
	);
}
