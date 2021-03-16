import { useMemo } from "react";
import { sortBy } from "lodash";
import { useCurrentUserInfo } from "../hooks/useCurrentUserInfo";
import { YourLoan } from "./YourLoan";
import { LoanStatus } from "../../spacetraders-api/users/loans/types";
import { IUserLoan } from "../../spacetraders-api/users/types";
import { Tile } from "../common/tiles/Tile";
import { TileContainer } from "../common/tiles/TileContainer";
import { t } from "../../helpers/translate";

export function YourLoans() {
	const { isLoading, isError, error, data: userInfo } = useCurrentUserInfo();

	const loans = useMemo(() => {
		if (userInfo === undefined) {
			return;
		}

		return sortLoans(userInfo.loans);
	}, [userInfo]);

	return (
		<>
			<h1>{t("Your Loans")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || loans === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : loans.length === 0 ? (
				<p>{t("You don't have any loans yet.")}</p>
			) : (
				<TileContainer>
					{loans.map((loan) => (
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
