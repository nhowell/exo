import axios, { AxiosError } from "axios";
import Bottleneck from "bottleneck";
import { GameApiModule } from "./game/GameApiModule";
import { MyApiModule } from "./my/MyApiModule";
import { IGetMyAccountInfoResponse } from "./my/types";
import {
	SpaceTradersError,
	IClaimUsernameResponse,
	IFailureResponse,
	IGameStatusResponse,
	HttpStatusCode,
} from "./types";
import { TypesApiModule } from "./types/TypesApiModule";
import { UsersApiModule } from "./users/UsersApiModule";

interface ApiOptions {
	/**
	 * Max number of automatic retries when the server replies with a
	 * 429 "Too Many Requests". Defaults to `3`.
	 */
	maxRetries?: number;
}

interface LimiterOptions {
	/**
	 * Initial reservior value. How many jobs can be executed before the limiter
	 * stops executing jobs. If reservoir reaches 0, no jobs will be executed
	 * until it is no longer 0. New jobs will still be queued up.
	 */
	reservoir?: number;

	/**
	 * Every `reservoirRefreshInterval` milliseconds, the reservoir value will
	 * be automatically updated to the value of `reservoirRefreshAmount`. The
	 * `reservoirRefreshInterval` value should be a multiple of 250.
	 */
	reservoirRefreshInterval?: number;

	/**
	 * The value to set `reservoir` to when `reservoirRefreshInterval` is in use.
	 */
	reservoirRefreshAmount?: number;

	/**
	 * Every `reservoirIncreaseInterval` milliseconds, the reservoir value will
	 * be automatically incremented by `reservoirIncreaseAmount`. The
	 * `reservoirIncreaseInterval` value should be a multiple of 250.
	 */
	reservoirIncreaseInterval?: number;

	/**
	 * The increment applied to `reservoir` when `reservoirIncreaseInterval`
	 * is in use.
	 */
	reservoirIncreaseAmount?: number;

	/**
	 * The maximum value that `reservoir` can reach when
	 * `reservoirIncreaseInterval` is in use.
	 */
	reservoirIncreaseMaximum?: number;

	/**
	 * The maximum number of concurrent requests.
	 */
	maxConcurrent?: number;

	/**
	 * The minimum number of milliseconds between each request. For example, to
	 * execute a max of 2 requests per second use `500`.
	 */
	minTime?: number;
}

// The SpaceTraders API allows 2 request per second, plus an extra allowance
// of 8 requests per 10 seconds to allow for some bursting.
// See: https://github.com/SpaceTradersAPI/issues-and-suggestions/issues/52#issuecomment-792448211
const defaultLimiterOptions: LimiterOptions = {
	reservoir: 8,
	reservoirRefreshInterval: 10_000,
	reservoirRefreshAmount: 8,
	reservoirIncreaseInterval: 1_000,
	reservoirIncreaseAmount: 2,
	reservoirIncreaseMaximum: 8,
	// We'll put a small delay betweem each request so we don't overload the
	// server with a bunch of requests all at the same moment.
	minTime: 100,
};

interface RequestOptions {
	params?:
		| {
				[key: string]: unknown;
		  }
		| URLSearchParams;
	data?: {
		[key: string]: unknown;
	};
	headers?: Headers;
}

interface Headers {
	[key: string]: string;
}

const axiosInstance = axios.create({
	baseURL: "https://api.spacetraders.io",
});

export class SpaceTradersApi {
	private static sharedLimiter: Bottleneck = new Bottleneck(
		defaultLimiterOptions,
	);

	private limiter: Bottleneck | null = null;
	private maxRetries = 3;

	public game: GameApiModule;
	public my: MyApiModule;
	public types: TypesApiModule;
	public users: UsersApiModule;

	constructor(
		private username: string,
		/**
		 * The user's "Bearer" token.
		 */
		private token: string,
		options?: ApiOptions,
		/**
		 * If `limiterOptions` are provided, this client instance will *not* use
		 * the shared rate limiter. If you want to set the options of the shared
		 * rate limiter, use `setSharedLimiterOptions`.
		 */
		limiterOptions?: LimiterOptions,
	) {
		if (options) {
			if (options.maxRetries !== undefined) {
				this.maxRetries = options.maxRetries;
			}
			if (options.maxRetries !== undefined) {
				this.maxRetries = options.maxRetries;
			}
		}

		if (limiterOptions) {
			this.limiter = new Bottleneck(limiterOptions);
		}

		this.game = new GameApiModule(this);
		this.my = new MyApiModule(this);
		this.types = new TypesApiModule(this);
		this.users = new UsersApiModule(this);
	}

	/**
	 * Set the options of the shared rate limiter.
	 */
	static setSharedLimiterOptions(limiterOptions: LimiterOptions) {
		if (this.sharedLimiter) {
			// Reservoir Intervals prevent a limiter from being garbage collected.
			// Calling .disconnect() to clear the interval and allow the memory to be freed.
			this.sharedLimiter.disconnect();
		}

		this.sharedLimiter = new Bottleneck(limiterOptions);
	}

	/**
	 * Get the SpaceTraders game server status.
	 */
	static getGameStatus(): Promise<IGameStatusResponse> {
		return this.request("get", "/game/status", this.sharedLimiter);
	}

	/**
	 * Claim a username and get a token for the new user.
	 */
	static claimUsernameAndGetToken(
		username: string,
	): Promise<IClaimUsernameResponse> {
		return this.request("post", `/users/${username}/claim`, this.sharedLimiter);
	}

	/**
	 * Check if a given username and token are valid.
	 * @returns The user's account info, otherwise throws.
	 */
	static checkToken(token: string): Promise<IGetMyAccountInfoResponse> {
		return this.request("get", `/my/account`, this.sharedLimiter, {
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	private static async request<T>(
		method: "get" | "post" | "put" | "delete",
		path: string,
		limiter: Bottleneck,
		options?: RequestOptions,
		maxRetries: number = 0,
		retry: number = 0,
	): Promise<T> {
		const sendRequest = () =>
			axiosInstance.request<T>({
				method: method,
				url: path,
				...options,
			});

		try {
			const response = await limiter.schedule(sendRequest);

			return response.data;
		} catch (error) {
			let message = "Something went wrong.";
			let statusCode: number | undefined;
			let code: number | undefined;

			if (this.isAxiosError(error)) {
				statusCode = error.response?.status;

				if (
					statusCode === HttpStatusCode.TooManyRequests &&
					retry < maxRetries
				) {
					const retryAfter =
						(error.response?.headers["retry-after"] ?? 1) * 1_000;
					await this.sleep(retryAfter);

					return this.request<T>(
						method,
						path,
						limiter,
						options,
						maxRetries,
						retry + 1,
					);
				}

				if (error.response?.data) {
					if (typeof error.response.data === "string") {
						message = error.response.data;
					} else if (this.isStandardFailureResponse(error.response?.data)) {
						message = error.response.data.error.message;
						code = error.response.data.error.code;
					}
				}
			}

			throw new SpaceTradersError(message, statusCode, code);
		}
	}

	private static isStandardFailureResponse(
		response: any,
	): response is IFailureResponse {
		return (
			response?.error !== undefined &&
			response.error.code &&
			response.error.message
		);
	}

	private static isAxiosError<T>(error: any): error is AxiosError<T> {
		return error.isAxiosError;
	}

	private static sleep(milliseconds: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	}

	getUsername() {
		return this.username;
	}

	get<T>(path: string, params?: any): Promise<T> {
		return SpaceTradersApi.request(
			"get",
			path,
			this.getLimiter(),
			{
				params,
				headers: this.getAuthorizationHeader(),
			},
			this.maxRetries,
		);
	}

	post<T>(path: string, data?: any): Promise<T> {
		return SpaceTradersApi.request(
			"post",
			path,
			this.getLimiter(),
			{
				data,
				headers: this.getAuthorizationHeader(),
			},
			this.maxRetries,
		);
	}

	put<T>(path: string, data?: any): Promise<T> {
		return SpaceTradersApi.request(
			"put",
			path,
			this.getLimiter(),
			{
				data,
				headers: this.getAuthorizationHeader(),
			},
			this.maxRetries,
		);
	}

	delete<T>(path: string): Promise<T> {
		return SpaceTradersApi.request(
			"delete",
			path,
			this.getLimiter(),
			{
				headers: this.getAuthorizationHeader(),
			},
			this.maxRetries,
		);
	}

	private getLimiter(): Bottleneck {
		return this.limiter ?? SpaceTradersApi.sharedLimiter;
	}

	private getAuthorizationHeader(): Headers {
		return { Authorization: `Bearer ${this.token}` };
	}
}
