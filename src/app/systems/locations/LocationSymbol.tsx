import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import commonStyles from "@/components/common.module.css";

import { generateViewLocationPath } from "../../routes";

interface IOwnProps {
	locationSymbol: string;
	asLink?: boolean;
}

export function LocationSymbol(props: IOwnProps): ReactElement {
	if (props.asLink) {
		return (
			<NavLink
				to={generateViewLocationPath(props.locationSymbol)}
				className={commonStyles.noWrap}
			>
				{props.locationSymbol}
			</NavLink>
		);
	}

	return <span className={commonStyles.noWrap}>{props.locationSymbol}</span>;
}
