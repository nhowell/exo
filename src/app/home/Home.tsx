import { UserInfo } from "../UserInfo";
import { AvailableLoans } from "../loans/AvailableLoans";
import { YourLoans } from "../loans/YourLoans";
import { AvailableShips } from "../ships/AvailableShips";

export function Home() {
	return (
		<>
			<UserInfo />
			<AvailableShips />
			<YourLoans />
			<AvailableLoans />
		</>
	);
}
