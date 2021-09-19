import { LoanStatus, LoanType } from "../../enums";

export interface IAcceptLoanResponse {
	credits: number;
	loan: IMyLoan;
}

export interface IGetMyLoansResponse {
	loans: IMyLoan[];
}

export interface IPayoffLoanResponse {
	credits: number;
	loans: IMyLoan[];
}

export interface IMyLoan {
	id: string;
	due: string;
	repaymentAmount: number;
	status: LoanStatus;
	type: LoanType;
}
