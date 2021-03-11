export enum LoanType {
	Startup = "STARTUP",
	Enterprise = "ENTERPRISE",
}

export interface IAvailableLoan {
	type: LoanType;
	amount: number;
	collateralRequired: boolean;
	rate: number;
	termInDays: number;
}
