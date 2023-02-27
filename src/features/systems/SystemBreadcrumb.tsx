import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import { systemsPath } from "@/routes";
import { t } from "@/utils/translate";

interface IOwnProps {
	systemName: string;
}

export function SystemBreadcrumb(props: IOwnProps): ReactElement {
	return (
		<small>
			<NavLink to={systemsPath}>{t("Systems")}</NavLink> &raquo;{" "}
			{props.systemName}
		</small>
	);
}
