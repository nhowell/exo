import { useMemo } from "react";
import { sortBy } from "lodash";
import { YourLoan } from "./YourLoan";
import { LoanStatus } from "../../spacetraders-api/users/loans/types";
import { IUserLoan } from "../../spacetraders-api/users/loans/types";
import { Tile } from "../common/tiles/Tile";
import { TileContainer } from "../common/tiles/TileContainer";
import { t } from "../../helpers/translate";
import { useLoans } from "../../spacetraders-api/users/loans/getLoans";
import { useCurrentUser } from "../hooks/useCurrentUser";

export function YourLoans() {
	const currentUser = useCurrentUser();
	const { isLoading, isError, error, data: loans } = useLoans(
		currentUser.username,
	);

	const sortedLoans = useMemo(() => {
		if (loans === undefined) {
			return;
		}

		return sortLoans(loans);
	}, [loans]);

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
						<Tile key={loan.id}>
							<YourLoan loan={loan} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}

function sortLoans(loans: readonly IUserLoan[]): IUserLoan[] {
	const currentLoans = sortBy(
		loans.filter((x) => x.status === LoanStatus.Current),
		[(x) => x.due],
	);

	const paidLoans = sortBy(
		loans.filter((x) => x.status !== LoanStatus.Current),
		[(x) => x.due],
	);

	return [...currentLoans, ...paidLoans];
}
