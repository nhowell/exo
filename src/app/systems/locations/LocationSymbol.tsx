import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { generateViewLocationPath } from "../../routes";
import commonStyles from "../../common/common.module.css";

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
