import { IAvailableLoan } from "../../spacetraders-api/api/types/types";
import { useAcceptLoan } from "../../spacetraders-api/hooks/my/loans/useAcceptLoan";
import { boolToHumanDisplay } from "../../utils/boolToHumanDisplay";
import { creditFormat } from "../../utils/creditFormat";
import { percentFormat } from "../../utils/numberFormat";
import { pluralize } from "../../utils/pluralize";
import { titleCase } from "../../utils/titleCase";
import { t } from "../../utils/translate";

interface IOwnProps {
	loan: IAvailableLoan;
}

export function AvailableLoan(props: IOwnProps) {
	const acceptLoan = useAcceptLoan();

	const handleClick = () => {
		acceptLoan.mutate(props.loan.type);
	};

	return (
		<>
			<h3>{t(titleCase(props.loan.type))}</h3>
			<dl>
				<div>
					<dt>{t("Amount")}:</dt>
					<dd>{creditFormat(props.loan.amount)}</dd>
				</div>
				<div>
					<dt>{t("Rate")}:</dt>
					<dd>{percentFormat(props.loan.rate / 100)}</dd>
				</div>
				<div>
					<dt>{t("Term")}:</dt>
					<dd>{pluralize(props.loan.termInDays, t("day"), t("days"))}</dd>
				</div>
				<div>
					<dt>{t("Collateral Required")}:</dt>
					<dd>{boolToHumanDisplay(props.loan.collateralRequired)}</dd>
				</div>
			</dl>

			{acceptLoan.error ? <p>{t(acceptLoan.error.message)}</p> : undefined}

			<button
				type="button"
				onClick={handleClick}
				disabled={acceptLoan.isLoading}
			>
				{t("Accept loan")}
			</button>
		</>
	);
}
