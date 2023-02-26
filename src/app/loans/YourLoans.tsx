import { sortBy } from "lodash";

import { LoanStatus } from "@/spacetraders-api/api/enums";
import {
	IGetMyLoansResponse,
	IMyLoan,
} from "@/spacetraders-api/api/my/loans/types";
import { useMyLoans } from "@/spacetraders-api/hooks/my/loans/useMyLoans";
import { t } from "@/utils/translate";

import { Tile } from "../common/tiles/Tile";
import { TileContainer } from "../common/tiles/TileContainer";
import { TransformedQueryResultHandler } from "../common/TransformedQueryResultHandler";

import { YourLoan } from "./YourLoan";

export function YourLoans() {
	const result = useMyLoans();

	return (
		<>
			<h1>{t("Your Loans")}</h1>
			<TransformedQueryResultHandler
				queryResult={result}
				transformData={transformData}
			>
				{(data) =>
					data.length === 0 ? (
						<p>{t("You don't have any loans yet.")}</p>
					) : (
						<TileContainer>
							{data.map((loan) => (
								<Tile key={loan.id} width="35rem">
									<YourLoan loan={loan} />
								</Tile>
							))}
						</TileContainer>
					)
				}
			</TransformedQueryResultHandler>
		</>
	);
}

function transformData(data: IGetMyLoansResponse): IMyLoan[] {
	return sortLoans(data.loans);
}

function sortLoans(loans: IMyLoan[]): IMyLoan[] {
	const currentLoans = sortBy(
		loans.filter((x) => x.status === LoanStatus.Current),
		(x) => x.due,
	);

	const paidLoans = sortBy(
		loans.filter((x) => x.status !== LoanStatus.Current),
		(x) => x.due,
	);

	return [...currentLoans, ...paidLoans];
}
