import { numberFormat } from "../../helpers/numberFormat";
import { IAvailableLoan } from "../../spacetraders-api/loans/types";
import { useAcceptLoan } from "../../spacetraders-api/users/loans/acceptLoan";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface IOwnProps {
	loan: IAvailableLoan;
}

export function AvailableLoan(props: IOwnProps) {
	const currentUser = useCurrentUser();
	const acceptLoan = useAcceptLoan();

	const handleClick = () => {
		acceptLoan.mutate({
			username: currentUser.username,
			type: props.loan.type,
		});
	};

	return (
		<>
			<p>
				<strong>Type:</strong> {props.loan.type}
				<br />
				<strong>Amount:</strong> {numberFormat(props.loan.amount)} Credits
				<br />
				<strong>Rate:</strong> {props.loan.rate}%
				<br />
				<strong>Term:</strong> {props.loan.termInDays} days
				<br />
				<strong>Collateral Required:</strong>{" "}
				{props.loan.collateralRequired ? "Yes" : "No"}
			</p>

			{acceptLoan.error ? <p>{acceptLoan.error}</p> : undefined}

			<button
				type="button"
				onClick={handleClick}
				disabled={acceptLoan.isLoading}
			>
				Accept loan
			</button>
		</>
	);
}
