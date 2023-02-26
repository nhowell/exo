import { sortBy } from "lodash";
import { ReactElement, useMemo } from "react";

import { TileContainer } from "@/components/tiles/TileContainer";
import { IMyShip, IShipCargo } from "@/spacetraders-api/api/my/ships/types";
import { t } from "@/utils/translate";

import { ShipCargoItem } from "./ShipCargoItem";

interface IOwnProps {
	ship: IMyShip;
}

export function ShipCargo(props: IOwnProps): ReactElement {
	const sortedCargo = useMemo(
		() => sortCargo(props.ship.cargo),
		[props.ship.cargo],
	);

	return sortedCargo.length === 0 ? (
		<p>{t("Cargo hold is empty.")}</p>
	) : (
		<TileContainer>
			{sortedCargo.map((cargoItem) => (
				<ShipCargoItem
					key={cargoItem.good}
					ship={props.ship}
					cargoItem={cargoItem}
				/>
			))}
		</TileContainer>
	);
}

function sortCargo(cargo: IShipCargo[]): IShipCargo[] {
	return sortBy(cargo, [(x) => x.good]);
}
