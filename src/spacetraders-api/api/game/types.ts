export interface INetWorthLeaderboardResponse {
	netWorth: IUserNetWorth[];
	userNetWorth: IUserNetWorth;
}

export interface IUserNetWorth {
	username: string;
	netWorth: number;
	rank: number;
}
