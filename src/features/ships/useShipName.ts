import { useMemo } from "react";
import { uniqueNamesGenerator } from "unique-names-generator";

import { shipNames } from "./shipNames";

export function useShipName(shipId: string): string {
	return useMemo(
		() =>
			uniqueNamesGenerator({
				dictionaries: [shipNames],
				length: 1,
				seed: shipId,
			}),
		[shipId],
	);
}
