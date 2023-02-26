import { QueryClient } from "react-query";

import { HttpStatusCode, SpaceTradersError } from "../api/types";

export const spaceTradersQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Default to a long cache and stale time, so this will force caching
			// by default. When a particular query doesn't want its data cached,
			// it should override this. The stale time is not set to Infinity because
			// while some endpoints are mostly static, they do sometimes change, like
			// when a new system, location, or anomaly is discovered.
			cacheTime: 60_000 * 60, // 60 minutes
			staleTime: 5_000 * 60, // 5 minutes.
			retry: (failureCount, error) => {
				if (
					error instanceof SpaceTradersError &&
					error.statusCode !== undefined
				) {
					if (error.statusCode === HttpStatusCode.TooManyRequests) {
						// We should retry if we hit the request limit.
						return true;
					} else if (error.statusCode >= 400 && error.statusCode < 500) {
						// Never retry other client side errors.
						return false;
					}
				}

				return failureCount < 3;
			},
			retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 10_000),
		},
	},
});
