import { ReactElement } from "react";
import { useLocation as useBrowserLocation, useParams } from "react-router-dom";

import { Tabs } from "../../../core/tabs/Tabs";
import { AtLeastOneTabPane } from "../../../core/tabs/types";
import { ILocation } from "../../../spacetraders-api/api/locations/types";
import { useLocation } from "../../../spacetraders-api/hooks/locations/useLocation";
import { mergeSymbols } from "../../../utils/mergeSymbols";
import { t } from "../../../utils/translate";
import { QueryResultHandler } from "../../common/QueryResultHandler";

import { LocationBreadcrumb } from "./LocationBreadcrumb";
import { LocationDockedShips } from "./LocationDockedShips";
import { LocationInfo } from "./LocationInfo";
import { LocationMarketplace } from "./LocationMarketplace";
import { LocationName } from "./LocationName";
import { LocationStructures } from "./LocationStructures";

export function ViewLocation(): ReactElement {
	const { systemSymbol, locationSymbol } = useParams();

	if (systemSymbol === undefined) {
		throw new Error("Missing 'systemSymbol' parameter.");
	} else if (locationSymbol === undefined) {
		throw new Error("Missing 'locationSymbol' parameter.");
	}

	const symbol = mergeSymbols(systemSymbol, locationSymbol);

	const result = useLocation(symbol);

	const getPanes = (location: ILocation): AtLeastOneTabPane => [
		{
			key: "info",
			label: t("Info"),
			content: <LocationInfo location={location} />,
		},
		{
			key: "marketplace",
			label: t("Marketplace"),
			content: <LocationMarketplace locationSymbol={symbol} />,
		},
		{
			key: "structures",
			label: t("Structures"),
			content: <LocationStructures locationSymbol={symbol} />,
		},
		{
			key: "docked-ships",
			label: t("Docked Ships"),
			content: <LocationDockedShips locationSymbol={symbol} />,
		},
	];

	const browserLocation = useBrowserLocation();

	return (
		<QueryResultHandler queryResult={result}>
			{(data) => (
				<>
					<LocationBreadcrumb
						systemSymbol={systemSymbol}
						locationName={data.location.name}
					/>

					<h1>
						<LocationName
							name={data.location.name}
							symbol={data.location.symbol}
						/>
					</h1>

					<Tabs
						panes={getPanes(data.location)}
						initialActiveTabKey={browserLocation.hash.substring(1)}
					/>
				</>
			)}
		</QueryResultHandler>
	);
}
