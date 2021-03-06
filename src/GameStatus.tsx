import { useGameStatus } from "./spacetraders-api/game/useGameStatus";

export function GameStatus() {
	const { isLoading, isError, data } = useGameStatus();

	const serverStatus = () => {
		if (isLoading) {
			return "...";
		} else if (isError) {
			return "Could not connect to server or server is offline.";
		} else {
			return data?.status ?? "Unknown";
		}
	};

	return (
		<p>
			<strong>Server Status:</strong> {serverStatus()}
		</p>
	);
}
