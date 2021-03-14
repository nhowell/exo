import { creditFormat } from "../../helpers/creditFormat";
import { t } from "../../helpers/translate";
import { usePayOffLoan } from "../../spacetraders-api/users/loans/payOffLoan";
import { LoanStatus } from "../../spacetraders-api/users/loans/types";
import { IUserLoan } from "../../spacetraders-api/users/types";
import { useCurrentUser } from "../hooks/useCurrentUser";

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
		<>
			<p>
				<strong>{t("Type")}:</strong> {t(props.loan.type)}
				<br />
				<strong>{t("Status")}:</strong> {t(props.loan.status)}
				<br />
				<strong>{t("Repayment Amount")}:</strong>{" "}
				{creditFormat(props.loan.repaymentAmount)}
				<br />
				<strong>{t("Due")}:</strong> {props.loan.due}
			</p>

			{payOffLoan.error ? <p>{payOffLoan.error}</p> : undefined}

			{props.loan.status === LoanStatus.Paid ? undefined : (
				<button
					type="button"
					onClick={handleClick}
					disabled={payOffLoan.isLoading}
				>
					{t("Pay off loan")}
				</button>
			)}
		</>
	);
}
