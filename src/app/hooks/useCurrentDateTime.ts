import { useContext } from "react";
import { currentDateTimeContext } from "../CurrentDateTimeProvider";

export function useCurrentDateTime() {
	return useContext(currentDateTimeContext);
}
