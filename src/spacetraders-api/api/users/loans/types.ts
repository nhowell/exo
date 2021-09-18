import { LoanType } from "../../types/types";

export enum LoanStatus {
	Current = "CURRENT",
	Paid = "PAID",
	PaidLate = "PAID_LATE",
}

export interface IGetUserLoansResponse {
	loans: IUserLoan[];
}

export interface IUserLoan {
	id: string;
	due: string;
	repaymentAmount: number;
	status: LoanStatus;
	type: LoanType;
}
