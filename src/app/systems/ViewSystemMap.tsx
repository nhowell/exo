import { ReactElement } from "react";
import { useParams } from "react-router";
import { useSystemInfo } from "../../spacetraders-api/hooks/systems/useSystemInfo";
import { SystemMap } from "./map/SystemMap";
import { useAddVisitedSystem } from "./useAddVisitedSystem";

export function ViewSystemMap(): ReactElement {
	const { systemSymbol } = useParams();

	if (systemSymbol === undefined) {
		throw new Error("Missing 'systemSymbol' parameter.");
	}

	const result = useSystemInfo(systemSymbol);

	useAddVisitedSystem(result.data?.system.symbol);

	return <SystemMap systemSymbol={systemSymbol} />;
}
