import { useMemo } from "react";
import { sortBy } from "lodash";
import { YourLoan } from "./YourLoan";
import { IMyLoan } from "../../spacetraders-api/api/my/loans/types";
import { Tile } from "../common/tiles/Tile";
import { TileContainer } from "../common/tiles/TileContainer";
import { t } from "../../helpers/translate";
import { useMyLoans } from "../../spacetraders-api/hooks/my/loans/useMyLoans";
import { LoanStatus } from "../../spacetraders-api/api/enums";

export function YourLoans() {
	const { isLoading, isError, error, data } = useMyLoans();

	const sortedLoans = useMemo(() => {
		if (data === undefined) {
			return;
		}

		return sortLoans(data.loans);
	}, [data]);

	return (
		<>
			<h1>{t("Your Loans")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || sortedLoans === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : sortedLoans.length === 0 ? (
				<p>{t("You don't have any loans yet.")}</p>
			) : (
				<TileContainer>
					{sortedLoans.map((loan) => (
						<Tile key={loan.id} width="35rem">
							<YourLoan loan={loan} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}

function sortLoans(loans: readonly IMyLoan[]): IMyLoan[] {
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
