import { ReactElement } from "react";
import { t } from "../../helpers/translate";
import { Tag } from "../common/Tag";
import { useSystemInfo } from "../../spacetraders-api/hooks/systems/useSystemInfo";

interface IOwnProps {
	symbol: string;
}

export function System(props: IOwnProps): ReactElement {
	const { isLoading, isError, error, data } = useSystemInfo(props.symbol);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : (
		<h3>
			{data.system.name} <Tag text={data.system.symbol} />
		</h3>
	);
}
