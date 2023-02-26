import { ReactElement } from "react";
import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { Tabs } from "@/core/tabs/Tabs";
import { AtLeastOneTabPane } from "@/core/tabs/types";
import { useSystemInfo } from "@/spacetraders-api/hooks/systems/useSystemInfo";
import { t } from "@/utils/translate";

import { QueryResultHandler } from "../common/QueryResultHandler";
import { Tag } from "../common/Tag";
import { generateViewSystemMapPath } from "../routes";

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
			content: (
				<>
					<p>
						<NavLink to={generateViewSystemMapPath(systemSymbol)}>
							Full page map view
						</NavLink>
					</p>
					<SystemMap systemSymbol={systemSymbol} />
				</>
			),
		},
	];

	const location = useLocation();

	return (
		<QueryResultHandler key={systemSymbol} queryResult={result}>
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
