import { LoanType } from "../../game/loans/types";

export enum LoanStatus {
	Current = "CURRENT",
	Paid = "PAID",
}

export interface IUserLoan {
	id: string;
	due: string;
	repaymentAmount: number;
	status: LoanStatus;
	type: LoanType;
}
