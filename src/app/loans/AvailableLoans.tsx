import { QueryResultHandler } from "@/components/QueryResultHandler";
import { Tile } from "@/components/tiles/Tile";
import { TileContainer } from "@/components/tiles/TileContainer";
import { useAvailableLoanTypes } from "@/spacetraders-api/hooks/types/useAvailableLoanTypes";
import { t } from "@/utils/translate";

import { AvailableLoan } from "./AvailableLoan";

export function AvailableLoans() {
	const result = useAvailableLoanTypes();

	return (
		<>
			<h1>{t("Available Loans")}</h1>
			<QueryResultHandler queryResult={result}>
				{(data) =>
					data.loans.length === 0 ? (
						<p>{t("There are no available loans.")}</p>
					) : (
						<TileContainer>
							{data.loans.map((loan) => (
								<Tile key={loan.type} width="35rem">
									<AvailableLoan loan={loan} />
								</Tile>
							))}
						</TileContainer>
					)
				}
			</QueryResultHandler>
		</>
	);
}
