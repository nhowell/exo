import { Dispatch, useCallback, useState } from "react";

export enum LocalStorageKey {
	Auth = "auth",
}

export function useLocalStorage<T>(
	key: LocalStorageKey,
	initialValue: T | (() => T),
): [T, Dispatch<T>] {
	// Pass initial state function to useState so logic is only executed once.
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);

			if (item !== null) {
				return JSON.parse(item) as T;
			}
		} catch (error) {
			console.log(error);
		}

		// Allow initialValue to be a function so we have same API as useState
		return initialValue instanceof Function ? initialValue() : initialValue;
	});

	const setValue = useCallback(
		(value: T) => {
			try {
				// Allow value to be a function so we have same API as useState
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;

				setStoredValue(valueToStore);

				if (valueToStore === undefined) {
					window.localStorage.removeItem(key);
				} else {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				// A more advanced implementation could handle the error case.
				console.log(error);
			}
		},
		[key, storedValue],
	);

	return [storedValue, setValue];
}
