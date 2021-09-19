import { SpaceTradersApi } from "../..";
import { LoanType } from "../../enums";
import {
	IAcceptLoanResponse,
	IGetMyLoansResponse,
	IPayoffLoanResponse,
} from "./types";

export class MyLoansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

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
