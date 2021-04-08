import { ReactElement, useMemo } from "react";
import { useParams } from "react-router";
import { t } from "../../helpers/translate";
import { useSystems } from "../../spacetraders-api/hooks/game/systems/useSystems";
import { Tag } from "../common/Tag";
import { SystemLocations } from "./SystemLocations";

interface IRouteParams {
	symbol: string;
}

export function ViewSystem(): ReactElement {
	const { symbol } = useParams<IRouteParams>();

	const { isLoading, data } = useSystems();

	const systemName = useMemo(() => {
		return data?.systems.find((x) => x.symbol === symbol)?.name;
	}, [symbol, data?.systems]);

	return (
		<>
			<h1>
				{isLoading ? t("Loading...") : systemName} <Tag text={symbol} />
			</h1>

			<SystemLocations systemSymbol={symbol} />
		</>
	);
}
