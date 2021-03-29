import { creditFormat } from "../../helpers/creditFormat";
import { t } from "../../helpers/translate";
import { usePayOffLoan } from "../../spacetraders-api/hooks/users/loans/usePayOffLoan";
import {
	IUserLoan,
	LoanStatus,
} from "../../spacetraders-api/api/users/loans/types";
import { TimeRemaining } from "../common/TimeRemaining";

interface IOwnProps {
	loan: IUserLoan;
}

export function YourLoan(props: IOwnProps) {
	const payOffLoan = usePayOffLoan();

	const handleClick = () => {
		payOffLoan.mutate(props.loan.id);
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
				{props.loan.status === LoanStatus.Paid ||
				props.loan.status === LoanStatus.PaidLate ? undefined : (
					<>
						<br />
						<strong>{t("Due")}:</strong>{" "}
						<TimeRemaining until={props.loan.due} />
					</>
				)}
			</p>

			{payOffLoan.error ? <p>{t(payOffLoan.error.message)}</p> : undefined}

			{props.loan.status === LoanStatus.Paid ||
			props.loan.status === LoanStatus.PaidLate ? undefined : (
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
