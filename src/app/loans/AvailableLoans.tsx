import { useAvailableLoans } from "../../spacetraders-api/hooks/game/loans/useAvailableLoans";
import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableLoan } from "./AvailableLoan";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";

export function AvailableLoans() {
	const { isLoading, isError, error, data } = useAvailableLoans();

	return (
		<>
			<h1>{t("Available Loans")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || data === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : data.loans.length === 0 ? (
				<p>{t("There are no available loans.")}</p>
			) : (
				<TileContainer>
					{data.loans.map((loan) => (
						<Tile key={loan.type} width="35rem">
							<AvailableLoan loan={loan} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}
