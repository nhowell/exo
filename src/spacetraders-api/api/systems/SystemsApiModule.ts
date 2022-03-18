import { SpaceTradersApi } from "..";
import {
	IGetAvailableShipsInSystemParams,
	IGetDockedShipsInSystemResponse,
	IGetFlightPlansInSystemResponse,
	IGetLocationsInSystemParams,
	ISystemAvailableShipsResponse,
	ISystemLocationsResponse,
	ISystemResponse,
} from "./types";

export class SystemsApiModule {
	constructor(private api: SpaceTradersApi) {
		this.getSystemInfo = this.getSystemInfo.bind(this);
		this.getLocationsInSystem = this.getLocationsInSystem.bind(this);
		this.getAvailableShipsInSystem = this.getAvailableShipsInSystem.bind(this);
		this.getDockedShipsInSystem = this.getDockedShipsInSystem.bind(this);
		this.getFlightPlansInSystem = this.getFlightPlansInSystem.bind(this);
	}

	getSystemInfo(systemSymbol: string): Promise<ISystemResponse> {
		return this.api.get(this.getSystemPath(systemSymbol));
	}

	getLocationsInSystem(
		systemSymbol: string,
		params?: IGetLocationsInSystemParams,
	): Promise<ISystemLocationsResponse> {
		return this.api.get(
			`${this.getSystemPath(systemSymbol)}/locations`,
			params,
		);
	}

	getAvailableShipsInSystem(
		systemSymbol: string,
		params?: IGetAvailableShipsInSystemParams,
	): Promise<ISystemAvailableShipsResponse> {
		return this.api.get(
			`${this.getSystemPath(systemSymbol)}/ship-listings`,
			params,
		);
	}

	getDockedShipsInSystem(
		systemSymbol: string,
	): Promise<IGetDockedShipsInSystemResponse> {
		return this.api.get(`${this.getSystemPath(systemSymbol)}/ships`);
	}

	getFlightPlansInSystem(
		systemSymbol: string,
	): Promise<IGetFlightPlansInSystemResponse> {
		return this.api.get(`${this.getSystemPath(systemSymbol)}/flight-plans`);
	}

	private getSystemPath(systemSymbol: string) {
		return `/systems/${systemSymbol}`;
	}
}
