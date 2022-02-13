import { useAvailableLoanTypes } from "../../spacetraders-api/hooks/types/useAvailableLoanTypes";
import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableLoan } from "./AvailableLoan";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";
import { QueryResultHandler } from "../common/QueryResultHandler";

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
