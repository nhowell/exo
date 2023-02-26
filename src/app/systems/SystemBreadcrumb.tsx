import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { t } from "../../utils/translate";
import { systemsPath } from "../routes";

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
