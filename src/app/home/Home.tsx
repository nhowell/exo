import { AvailableLoans } from "../loans/AvailableLoans";
import { YourLoans } from "../loans/YourLoans";
import { AvailableShips } from "../ships/AvailableShips";

export function Home() {
	return (
		<>
			<AvailableShips />
			<YourLoans />
			<AvailableLoans />
		</>
	);
}
