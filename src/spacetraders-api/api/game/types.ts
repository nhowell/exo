import { IAllStringKeyProps } from "@/types";

export interface INetWorthLeaderboardResponse {
	netWorth: IUserNetWorth[];
	userNetWorth: IUserNetWorth;
}

export interface IUserNetWorth extends IAllStringKeyProps {
	username: string;
	netWorth: number;
	rank: number;
}
