import { useContext } from "react";

import { CurrentDateTimeContext } from "../app/CurrentDateTimeProvider";

export function useCurrentDateTime() {
	return useContext(CurrentDateTimeContext);
}
