import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T {
	const ref = useRef<T>(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	// Return previous value (happens before update in useEffect above)
	return ref.current;
}
