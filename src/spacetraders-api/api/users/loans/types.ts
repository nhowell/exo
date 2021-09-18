import { LoanStatus, LoanType } from "../../enums";

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
