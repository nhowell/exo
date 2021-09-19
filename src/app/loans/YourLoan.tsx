import { creditFormat } from "../../helpers/creditFormat";
import { t } from "../../helpers/translate";
import { usePayOffLoan } from "../../spacetraders-api/hooks/my/loans/usePayOffLoan";
import { IMyLoan } from "../../spacetraders-api/api/my/loans/types";
import { TimeRemaining } from "../common/TimeRemaining";
import { LoanStatus } from "../../spacetraders-api/api/enums";
import { titleCase } from "../../helpers/titleCase";

interface IOwnProps {
	loan: IMyLoan;
}

export function YourLoan(props: IOwnProps) {
	const payOffLoan = usePayOffLoan();

	const handleClick = () => {
		payOffLoan.mutate(props.loan.id);
	};

	const isUnpaid =
		props.loan.status !== LoanStatus.Paid &&
		props.loan.status !== LoanStatus.PaidLate;

	return (
		<>
			<h3>{t(titleCase(props.loan.type))}</h3>
			<dl>
				<div>
					<dt>{t("Status")}:</dt>
					<dd>{t(titleCase(props.loan.status))}</dd>
				</div>
				<div>
					<dt>{t("Repayment Amount")}:</dt>
					<dd>{creditFormat(props.loan.repaymentAmount)}</dd>
				</div>
				{isUnpaid && (
					<div>
						<dt>{t("Due")}:</dt>
						<dd>
							<TimeRemaining until={props.loan.due} />
						</dd>
					</div>
				)}
			</dl>

			{payOffLoan.error ? <p>{t(payOffLoan.error.message)}</p> : undefined}

			{isUnpaid && (
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
