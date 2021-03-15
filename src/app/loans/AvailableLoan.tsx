import { creditFormat } from "../../helpers/creditFormat";
import { percentFormat } from "../../helpers/numberFormat";
import { pluralize } from "../../helpers/pluralize";
import { t } from "../../helpers/translate";
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
				<strong>{t("Type")}:</strong> {t(props.loan.type)}
				<br />
				<strong>{t("Amount")}:</strong> {creditFormat(props.loan.amount)}
				<br />
				<strong>{t("Rate")}:</strong> {percentFormat(props.loan.rate / 100)}
				<br />
				<strong>{t("Term")}:</strong>{" "}
				{pluralize(props.loan.termInDays, t("day"), t("days"))}
				<br />
				<strong>{t("Collateral Required")}:</strong>{" "}
				{props.loan.collateralRequired ? t("Yes") : t("No")}
			</p>

			{acceptLoan.error ? <p>{acceptLoan.error}</p> : undefined}

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
