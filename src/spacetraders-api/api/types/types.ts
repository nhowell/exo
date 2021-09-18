export enum LoanType {
	Startup = "STARTUP",
}

export interface GetAvailableLoanTypesResponse {
	loans: IAvailableLoan[];
}

export interface IAvailableLoan {
	type: LoanType;
	amount: number;
	collateralRequired: boolean;
	rate: number;
	termInDays: number;
}
