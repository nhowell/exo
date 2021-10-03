import { ReactElement, useMemo } from "react";
import { t } from "../../../helpers/translate";
import { Table } from "../../../core/table/Table";
import { ITableColumnHeader } from "../../../core/table/types";
import { IMarketplaceListing } from "../../../spacetraders-api/api/locations/types";
import { sortBy } from "lodash";
import { useMarketplaceAtLocation } from "../../../spacetraders-api/hooks/locations/useMarketplaceAtLocation";
import { titleCase } from "../../../helpers/titleCase";

interface IOwnProps {
	locationSymbol: string;
}

const marketplaceListingsColumnDefinitions: ITableColumnHeader<IMarketplaceListing>[] =
	[
		{
			keyname: "symbol",
			label: t("Good"),
			customFormat: (x) => t(titleCase(x.symbol)),
		},
		{
			keyname: "volumePerUnit",
			label: t("Volume per Unit"),
			align: "right",
			format: "number",
		},
		{
			keyname: "purchasePricePerUnit",
			label: t("Purchase Price per Unit"),
			align: "right",
			format: "credits",
		},
		{
			keyname: "sellPricePerUnit",
			label: t("Sell Price per Unit"),
			align: "right",
			format: "credits",
		},
		{
			keyname: "quantityAvailable",
			label: t("Quantity Available"),
			align: "right",
			format: "number",
		},
	];

export function LocationMarketplace(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useMarketplaceAtLocation(
		props.locationSymbol,
	);

	const sortedListings = useMemo(() => {
		if (data === undefined) {
			return [];
		}

		return sortMarketplaceListings(data.marketplace);
	}, [data]);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : sortedListings.length === 0 ? (
		<p>{t("No marketplace listings available.")}</p>
	) : (
		<Table<IMarketplaceListing>
			keyField="symbol"
			columnDefinitions={marketplaceListingsColumnDefinitions}
			tableData={sortedListings}
			striped
		/>
	);
}

function sortMarketplaceListings(
	marketplaceListings: readonly IMarketplaceListing[],
): IMarketplaceListing[] {
	return sortBy(marketplaceListings, [(x) => x.symbol]);
}
