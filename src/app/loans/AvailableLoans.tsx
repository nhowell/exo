import { useAvailableLoans } from "../../spacetraders-api/game/loans/getAvailableLoans";
import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableLoan } from "./AvailableLoan";
import { Tile } from "../common/tiles/Tile";
import { t } from "../../helpers/translate";

export function AvailableLoans() {
	const {
		isLoading,
		isError,
		error,
		data: availableLoans,
	} = useAvailableLoans();

	return (
		<>
			<h1>{t("Available Loans")}</h1>
			{isLoading ? (
				<p>{t("Loading...")}</p>
			) : isError || availableLoans === undefined ? (
				<p>{t(error?.message ?? "Something went wrong.")}</p>
			) : availableLoans.length === 0 ? (
				<p>{t("There are no available loans.")}</p>
			) : (
				<TileContainer>
					{availableLoans.map((loan) => (
						<Tile key={loan.type}>
							<AvailableLoan loan={loan} />
						</Tile>
					))}
				</TileContainer>
			)}
		</>
	);
}
