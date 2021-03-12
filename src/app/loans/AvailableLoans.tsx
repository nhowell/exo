import { useAvailableLoans } from "../../spacetraders-api/loans/getAvailableLoans";
import { AvailableLoan } from "./AvailableLoan";

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
				availableLoans.map((loan) => (
					<AvailableLoan key={loan.type} loan={loan} />
				))
			)}
		</>
	);
}
