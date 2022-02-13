import { ReactElement } from "react";
import { useLocation, useParams } from "react-router";
import { Tabs } from "../../core/tabs/Tabs";
import { AtLeastOneTabPane } from "../../core/tabs/types";
import { t } from "../../helpers/translate";
import { useSystemInfo } from "../../spacetraders-api/hooks/systems/useSystemInfo";
import { QueryResultHandler } from "../common/QueryResultHandler";
import { Tag } from "../common/Tag";
import { AvailableShips } from "./AvailableShips";
import { SystemMap } from "./map/SystemMap";
import { SystemBreadcrumb } from "./SystemBreadcrumb";
import { SystemLocations } from "./SystemLocations";
import { useAddVisitedSystem } from "./useAddVisitedSystem";

export enum SystemTabKey {
	Locations = "locations",
	AvailableShips = "available-ships",
	Map = "map",
}

export function ViewSystem(): ReactElement {
	const { systemSymbol } = useParams();

	if (systemSymbol === undefined) {
		throw new Error("Missing 'systemSymbol' parameter.");
	}

	const result = useSystemInfo(systemSymbol);

	useAddVisitedSystem(result.data?.system.symbol);

	const panes: AtLeastOneTabPane = [
		{
			key: SystemTabKey.Locations,
			label: t("Locations"),
			content: <SystemLocations systemSymbol={systemSymbol} />,
		},
		{
			key: SystemTabKey.AvailableShips,
			label: t("Available Ships"),
			content: <AvailableShips systemSymbol={systemSymbol} />,
		},
		{
			key: SystemTabKey.Map,
			label: t("Map"),
			content: <SystemMap systemSymbol={systemSymbol} />,
		},
	];

	const location = useLocation();

	return (
		<QueryResultHandler queryResult={result}>
			{(data) => (
				<>
					<SystemBreadcrumb systemName={data.system.name} />

					<h1>
						{data.system.name} <Tag text={systemSymbol} />
					</h1>

					<Tabs
						panes={panes}
						initialActiveTabKey={location.hash.substring(1)}
					/>
				</>
			)}
		</QueryResultHandler>
	);
}
