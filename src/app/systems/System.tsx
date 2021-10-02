import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { t } from "../../helpers/translate";
import { Tag } from "../common/Tag";
import { generateViewSystemPath } from "../routes";
import { useSystemInfo } from "../../spacetraders-api/hooks/systems/useSystemInfo";

interface IOwnProps {
	symbol: string;
}

export function System(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useSystemInfo(props.symbol);

	return (
		<>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || data === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : (
				<>
					<h3>
						{data.system.name} <Tag text={data.system.symbol} />
					</h3>

					<p>
						<NavLink to={generateViewSystemPath(data.system.symbol)}>
							{t("View details")}
						</NavLink>
					</p>
				</>
			)}
		</>
	);
}
