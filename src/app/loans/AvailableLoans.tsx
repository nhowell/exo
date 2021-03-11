import { useAvailableLoans } from "../../spacetraders-api/loans/getAvailableLoans";

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
			) : isError ? (
				<p>{error}</p>
			) : (
				availableLoans?.map((availableLoan, i) => {
					return (
						<p key={i}>
							<strong>Type:</strong> {availableLoan.type}
							<br />
							<strong>Amount:</strong> {availableLoan.amount}
							<br />
							<strong>Rate:</strong> {availableLoan.rate}
							<br />
							<strong>Term:</strong> {availableLoan.termInDays} days
							<br />
							<strong>Collateral Required:</strong>{" "}
							{availableLoan.collateralRequired ? "Yes" : "No"}
						</p>
					);
				})
			)}
		</>
	);
}
