import { ReactElement } from "react";
import { useParams } from "react-router";
import { t } from "../../helpers/translate";
import { useSystem } from "../../spacetraders-api/hooks/systems/useSystem";
import { Tag } from "../common/Tag";
import { SystemLocations } from "./SystemLocations";

interface IRouteParams {
	systemSymbol: string;
}

export function ViewSystem(): ReactElement {
	const { systemSymbol } = useParams<IRouteParams>();
	const { isLoading, isError, error, data } = useSystem(systemSymbol);

	return isLoading ? (
		<p>{t("Loading...")}</p>
	) : isError || data === undefined ? (
		<p>{t(error?.message ?? "Something went wrong.")}</p>
	) : (
		<>
			<h1>
				{data.system.name} <Tag text={systemSymbol} />
			</h1>

			<SystemLocations systemSymbol={systemSymbol} />
		</>
	);
}
