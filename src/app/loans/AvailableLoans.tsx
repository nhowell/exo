import { useAvailableLoans } from "../../spacetraders-api/loans/getAvailableLoans";
import { TileContainer } from "../common/tiles/TileContainer";
import { AvailableLoan } from "./AvailableLoan";
import { Tile } from "../common/tiles/Tile";

export function AvailableLoans() {
	const {
		isLoading,
		isError,
		error,
		data: availableLoans,
	} = useAvailableLoans();

	return (
		<>
			<h1>Available Loans</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : isError || availableLoans === undefined ? (
				<p>{error ?? "Something went wrong."}</p>
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
