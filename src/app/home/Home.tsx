import { AvailableLoans } from "../loans/AvailableLoans";
import { YourLoans } from "../loans/YourLoans";
import { AvailableShips } from "../ships/AvailableShips";
import { YourShips } from "../ships/YourShips";

export function Home() {
	return (
		<>
			<YourShips />
			<AvailableShips />
			<YourLoans />
			<AvailableLoans />
		</>
	);
}
