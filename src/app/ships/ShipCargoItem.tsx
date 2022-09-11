import { ReactElement, useState } from "react";
import { LinkButton } from "../../core/buttons/LinkButton";
import { numberFormat } from "../../helpers/numberFormat";
import { titleCase } from "../../helpers/titleCase";
import { t } from "../../helpers/translate";
import { IMyShip, IShipCargo } from "../../spacetraders-api/api/my/ships/types";
import { Tile } from "../common/tiles/Tile";
import { JettisonCargo } from "./JettisonCargo";

interface IOwnProps {
	ship: IMyShip;
	cargoItem: IShipCargo;
}

export function ShipCargoItem(props: IOwnProps): ReactElement {
	const [showJettison, setShowJettison] = useState(false);

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

			{showJettison ? (
				<JettisonCargo
					ship={props.ship}
					cargoItem={props.cargoItem}
					onCancel={() => setShowJettison(false)}
				/>
			) : (
				<p>
					<LinkButton onClick={() => setShowJettison(true)}>
						{t("Jettison")}
					</LinkButton>
				</p>
			)}
		</Tile>
	);
}
