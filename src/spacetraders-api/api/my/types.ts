export interface IGetMyAccountInfoResponse {
	user: IUser;
}

export interface IUser {
	username: string;
	shipCount: number;
	structureCount: number;
	joinedAt: string;
	credits: number;
}
