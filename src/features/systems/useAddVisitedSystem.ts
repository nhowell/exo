import { useEffect } from "react";

import { useVisitedSystems } from "./useVisitedSystems";

export function useAddVisitedSystem(systemSymbol: string | undefined) {
	const [, addVisitedSystemsIfNeeded] = useVisitedSystems();

	useEffect(() => {
		if (systemSymbol !== undefined) {
			addVisitedSystemsIfNeeded(systemSymbol);
		}
	}, [addVisitedSystemsIfNeeded, systemSymbol]);
}
