import { SpaceTradersApi } from "../..";
import { LoanType } from "../../enums";
import {
	IAcceptLoanResponse,
	IGetMyLoansResponse,
	IPayoffLoanResponse,
} from "./types";

export class MyLoansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {
		this.acceptLoan = this.acceptLoan.bind(this);
		this.getLoans = this.getLoans.bind(this);
		this.payOffLoan = this.payOffLoan.bind(this);
		this.getMyLoansPath = this.getMyLoansPath.bind(this);
	}

	acceptLoan(type: LoanType): Promise<IAcceptLoanResponse> {
		return this.api.post(this.getMyLoansPath(), { type });
	}

	getLoans(): Promise<IGetMyLoansResponse> {
		return this.api.get(this.getMyLoansPath());
	}

	payOffLoan(loanId: string): Promise<IPayoffLoanResponse> {
		return this.api.put(`${this.getMyLoansPath()}/${loanId}`);
	}

	private getMyLoansPath() {
		return `${this.basePath}/loans`;
	}
}
