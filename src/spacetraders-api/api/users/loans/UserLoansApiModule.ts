import { SpaceTradersApi } from "../..";
import { LoanType } from "../../enums";
import { IGetUserInfoResponse } from "../types";
import { IGetUserLoansResponse } from "./types";

export class UserLoansApiModule {
	constructor(private api: SpaceTradersApi, private basePath: string) {}

	acceptLoan(type: LoanType): Promise<IGetUserInfoResponse> {
		return this.api.post(this.getUserLoansPath(), { type });
	}

	getLoans(): Promise<IGetUserLoansResponse> {
		return this.api.get(this.getUserLoansPath());
	}

	payOffLoan(loanId: string): Promise<IGetUserInfoResponse> {
		return this.api.put(`${this.getUserLoansPath()}/${loanId}`);
	}

	private getUserLoansPath() {
		return `${this.basePath}/loans`;
	}
}
