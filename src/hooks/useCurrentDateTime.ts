import { useContext } from "react";

import { CurrentDateTimeContext } from "@/providers/CurrentDateTimeProvider";

export function useCurrentDateTime() {
	return useContext(CurrentDateTimeContext);
}
