export enum LoanType {
	Startup = "STARTUP",
	Enterprise = "ENTERPRISE",
}

export interface IGetAvailableLoansResponse {
	loans: IAvailableLoan[];
}

export interface IAvailableLoan {
	type: LoanType;
	amount: number;
	collateralRequired: boolean;
	rate: number;
	termInDays: number;
}
