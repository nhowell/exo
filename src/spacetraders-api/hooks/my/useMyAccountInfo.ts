import { spaceTradersQueryClient } from "../spaceTradersQueryClient";
import { useSpaceTradersApi } from "../useSpaceTradersApi";
import { useSpaceTradersQuery } from "../useSpaceTradersQuery";
import { SpaceTradersApi } from "../../api";
import { MY_QUERY_KEY } from ".";
import { IGetMyAccountInfoResponse } from "../../api/my/types";
import produce from "immer";

const MY_ACCOUNT_QUERY_KEY = [MY_QUERY_KEY, "account"];

export function useMyAccountInfo() {
	const spaceTradersApi = useSpaceTradersApi();

	return useSpaceTradersQuery(MY_ACCOUNT_QUERY_KEY, () =>
		spaceTradersApi.my.getAccountInfo(),
	);
}

export function checkToken(token: string) {
	return spaceTradersQueryClient.fetchQuery(MY_ACCOUNT_QUERY_KEY, () =>
		SpaceTradersApi.checkToken(token),
	);
}

export function setCreditsQueryData(credits: number) {
	const accountInfo =
		spaceTradersQueryClient.getQueryData<IGetMyAccountInfoResponse>(
			MY_ACCOUNT_QUERY_KEY,
		);

	if (accountInfo === undefined) {
		return;
	}

	const newAccountInfo = produce(accountInfo, (draft) => {
		draft.user.credits = credits;
	});

	spaceTradersQueryClient.setQueryData<IGetMyAccountInfoResponse>(
		MY_ACCOUNT_QUERY_KEY,
		newAccountInfo,
	);
}

export function adjustCreditsQueryData(creditAdjustmentAmount: number) {
	const accountInfo =
		spaceTradersQueryClient.getQueryData<IGetMyAccountInfoResponse>(
			MY_ACCOUNT_QUERY_KEY,
		);

	if (accountInfo === undefined) {
		return;
	}

	const newAccountInfo = produce(accountInfo, (draft) => {
		draft.user.credits += creditAdjustmentAmount;
	});

	spaceTradersQueryClient.setQueryData<IGetMyAccountInfoResponse>(
		MY_ACCOUNT_QUERY_KEY,
		newAccountInfo,
	);
}
