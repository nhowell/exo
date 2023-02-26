import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import { useSystemInfo } from "@/spacetraders-api/hooks/systems/useSystemInfo";
import { t } from "@/utils/translate";

import { generateViewSystemPath, systemsPath } from "../../routes";

interface IOwnProps {
	systemSymbol: string;
	locationName: string;
}

export function LocationBreadcrumb(props: IOwnProps): ReactElement {
	const systemInfo = useSystemInfo(props.systemSymbol);

	return (
		<small>
			<NavLink to={systemsPath}>{t("Systems")}</NavLink> &raquo;{" "}
			<NavLink to={generateViewSystemPath(props.systemSymbol)}>
				{systemInfo.data?.system.name ?? props.systemSymbol}
			</NavLink>{" "}
			&raquo; {props.locationName}
		</small>
	);
}
