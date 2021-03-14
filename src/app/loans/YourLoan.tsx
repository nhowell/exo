import { numberFormat } from "../../helpers/numberFormat";
import { usePayOffLoan } from "../../spacetraders-api/users/loans/payOffLoan";
import { IUserLoan } from "../../spacetraders-api/users/types";
import { useCurrentUser } from "../hooks/useCurrentUser";
import styles from "./AvailableLoan.module.css";

interface IOwnProps {
	loan: IUserLoan;
}

export function YourLoan(props: IOwnProps) {
	const currentUser = useCurrentUser();
	const payOffLoan = usePayOffLoan();

	const handleClick = () => {
		payOffLoan.mutate({
			username: currentUser.username,
			loanId: props.loan.id,
		});
	};

	return (
		<div className={styles.availableLoan}>
			<p>
				<strong>Type:</strong> {props.loan.type}
				<br />
				<strong>Status:</strong> {props.loan.status}
				<br />
				<strong>Repayment Amount:</strong>{" "}
				{numberFormat(props.loan.repaymentAmount)} Credits
				<br />
				<strong>Due:</strong> {props.loan.due}
			</p>

			{payOffLoan.error ? <p>{payOffLoan.error}</p> : undefined}

			<button
				type="button"
				onClick={handleClick}
				disabled={payOffLoan.isLoading}
			>
				Pay off loan
			</button>
		</div>
	);
}
