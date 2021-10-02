import { ReactElement } from "react";
import { useParams } from "react-router";
import { t } from "../../helpers/translate";
import { useSystemInfo } from "../../spacetraders-api/hooks/systems/useSystemInfo";
import { Tag } from "../common/Tag";
import { SystemLocations } from "./SystemLocations";
import { useAddVisitedSystem } from "./useAddVisitedSystem";

interface IRouteParams {
	systemSymbol: string;
}

export function ViewSystem(): ReactElement {
	const { systemSymbol } = useParams<IRouteParams>();
	const { isLoading, isError, error, data } = useSystemInfo(systemSymbol);

	useAddVisitedSystem(
		!isLoading && !isError && data !== undefined
			? data.system.symbol
			: undefined,
	);

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
