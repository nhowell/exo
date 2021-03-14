import { useUserInfo } from "../../spacetraders-api/users/getUserInfo";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { YourLoan } from "./YourLoan";

export function YourLoans() {
	const currentUser = useCurrentUser();
	const { isLoading, isError, error, data: userInfo } = useUserInfo(
		currentUser.username,
	);

	return (
		<>
			<h1>Your Loans</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : isError || userInfo === undefined ? (
				<p>{error ?? "Something went wrong."}</p>
			) : userInfo.loans.length === 0 ? (
				<p>You don't have any loans yet.</p>
			) : (
				userInfo.loans.map((loan) => <YourLoan key={loan.type} loan={loan} />)
			)}
		</>
	);
}
