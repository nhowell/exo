import { ReactElement, useMemo } from "react";
import { t } from "../../helpers/translate";
import { IMyDockedShip } from "../../spacetraders-api/api/my/ships/types";
import { useMarketplaceAtLocation } from "../../spacetraders-api/hooks/locations/useMarketplaceAtLocation";
import { TileContainer } from "../common/tiles/TileContainer";
import { mapToMarketplaceListingForShip } from "./BuyGoods";
import { SellGood } from "./SellGood";

interface IOwnProps {
	ship: IMyDockedShip;
}

export function SellGoods(props: IOwnProps): ReactElement {
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
				<SellGood
					key={listing.symbol}
					ship={props.ship}
					marketplaceListing={listing}
				/>
			))}
		</TileContainer>
	);
}
