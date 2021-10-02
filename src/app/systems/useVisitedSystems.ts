import { useCallback } from "react";
import { LocalStorageKey, useLocalStorage } from "../hooks/useLocalStorage";
import produce from "immer";

// Since the SpaceTraders API doesn't expose a /systems endpoint, new players
// don't have a way to know which systems exist. This acts as a guide for new
// players to give them the "Omicron Eridani" system to begin with.
const STARTER_SYSTEM = "OE";

export function useVisitedSystems(): [
	string[],
	(...systemSymbols: string[]) => void,
] {
	const [visitedSystems, setVisitedSystems] = useLocalStorage<string[]>(
		LocalStorageKey.VisitedSystems,
		[STARTER_SYSTEM],
	);

	const addVisitedSystemsIfNeeded = useCallback(
		(...systemSymbols: string[]) => {
			let needsUpdated = false;

			const newVisitedSystems = produce(visitedSystems, (draft) => {
				for (const systemSymbol of systemSymbols) {
					if (!visitedSystems.includes(systemSymbol)) {
						draft.push(systemSymbol);
						needsUpdated = true;
					}
				}
			});

			if (needsUpdated) {
				setVisitedSystems(newVisitedSystems);
			}
		},
		[setVisitedSystems, visitedSystems],
	);

	return [visitedSystems, addVisitedSystemsIfNeeded];
}
