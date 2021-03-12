import { UserInfo } from "../UserInfo";
import { AvailableLoans } from "../loans/AvailableLoans";
import { YourLoans } from "../loans/YourLoans";

export function Home() {
	return (
		<>
			<UserInfo />
			<YourLoans />
			<AvailableLoans />
		</>
	);
}
