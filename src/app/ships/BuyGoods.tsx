import { sortBy } from "lodash";
import { ReactElement, useMemo } from "react";
import { t } from "../../helpers/translate";
import { IMarketplaceListing } from "../../spacetraders-api/api/locations/types";
import {
	IMyDockedShip,
	IShipCargo,
} from "../../spacetraders-api/api/my/ships/types";
import { useMarketplaceAtLocation } from "../../spacetraders-api/hooks/locations/useMarketplaceAtLocation";
import { TileContainer } from "../common/tiles/TileContainer";
import { BuyGood } from "./BuyGood";

interface IOwnProps {
	ship: IMyDockedShip;
}

export function BuyGoods(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useMarketplaceAtLocation(
		props.ship.location,
	);

	const listings = useMemo(
		() =>
			data
				? mapToMarketplaceListingForShip(props.ship.cargo, data.marketplace)
				: [],
		[data, props.ship.cargo],
	);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : listings.length === 0 ? (
		<p>{t("No marketplace listings available.")}</p>
	) : (
		<TileContainer>
			{listings.map((listing) => (
				<BuyGood
					key={listing.symbol}
					ship={props.ship}
					marketplaceListing={listing}
				/>
			))}
		</TileContainer>
	);
}

export interface IMarketplaceListingForShip extends IMarketplaceListing {
	quantityOwned: number;
}

export function mapToMarketplaceListingForShip(
	cargo: IShipCargo[],
	marketplaceListings: IMarketplaceListing[],
): IMarketplaceListingForShip[] {
	const listings = marketplaceListings.map<IMarketplaceListingForShip>((x) => {
		return {
			...x,
			quantityOwned: 0,
		};
	});

	for (const cargoItem of cargo) {
		const existingRow = listings.find((x) => x.symbol === cargoItem.good);

		if (existingRow !== undefined) {
			existingRow.quantityOwned = cargoItem.quantity;
		}
	}

	return sortBy(listings, [(x) => x.symbol]);
}
