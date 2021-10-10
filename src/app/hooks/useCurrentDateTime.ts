import { useContext } from "react";
import { CurrentDateTimeContext } from "../CurrentDateTimeProvider";

export function useCurrentDateTime() {
	return useContext(CurrentDateTimeContext);
}
