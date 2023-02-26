import { useEffect, useRef } from "react";

type Callback = () => void;

/**
 *
 * @param callback Function to call on an interval.
 * @param delay The time in milliseconds. When `null`, the interval is disabled.
 */
export function useInterval(callback: Callback, delay: number | null) {
	const savedCallback = useRef<Callback>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current?.();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
