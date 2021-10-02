import { useEffect, useMemo } from "react";
import { useMyShips } from "../../spacetraders-api/hooks/my/ships/useMyShips";
import { notUndefined } from "../../helpers/notUndefined";
import { splitSymbol } from "../../helpers/splitSymbol";
import { useVisitedSystems } from "./useVisitedSystems";

// TODO: Have this use locations of owned structures as well.
export function useKnownSystems() {
	const myShips = useMyShips();

	const currentSystems = useMemo(() => {
		if (myShips.data === undefined) {
			return;
		}

		const locations = myShips.data.ships
			.map((x) => x.location)
			.filter(notUndefined);

		const currentSystemsSet = new Set(
			locations.map((x) => splitSymbol(x).systemSymbol),
		);

		return Array.from(currentSystemsSet);
	}, [myShips.data]);

	const [visitedSystems, addVisitedSystemsIfNeeded] = useVisitedSystems();

	useEffect(() => {
		if (currentSystems) {
			addVisitedSystemsIfNeeded(...currentSystems);
		}
	}, [addVisitedSystemsIfNeeded, currentSystems]);

	const sortedKnownSystems = useMemo(() => {
		const knownSystemsSet = new Set([
			...visitedSystems,
			...(currentSystems ?? []),
		]);

		return Array.from(knownSystemsSet).sort();
	}, [currentSystems, visitedSystems]);

	return {
		isLoading: myShips.isLoading,
		isError: myShips.isError,
		error: myShips.error,
		data: sortedKnownSystems,
	};
}
