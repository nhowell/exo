export interface INetWorthLeaderboardResponse {
	netWorth: IUserNetWorth[];
	userNetWorth: IUserNetWorth;
}

interface IUserNetWorth {
	username: string;
	netWorth: number;
	rank: number;
}
