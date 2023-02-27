import { ReactElement } from "react";

import { AvailableLoans } from "./AvailableLoans";
import { YourLoans } from "./YourLoans";

export function Loans(): ReactElement {
	return (
		<>
			<YourLoans />
			<AvailableLoans />
		</>
	);
}
