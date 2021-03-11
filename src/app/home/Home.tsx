import { UserInfo } from "../UserInfo";
import { AvailableLoans } from "../loans/AvailableLoans";

export function Home() {
	return (
		<>
			<UserInfo />

			<AvailableLoans />
		</>
	);
}
