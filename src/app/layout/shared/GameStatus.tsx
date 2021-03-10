import { useGameStatus } from "../../../spacetraders-api/game/useGameStatus";
import { LoadingSpinner } from "../../common/loading/LoadingSpinner";

export function GameStatus() {
	const { isLoading, isError, data } = useGameStatus();

	const gameStatus = () => {
		if (isLoading) {
			return <LoadingSpinner size="small" />;
		} else if (isError) {
			return "Could not connect to game server or server is offline.";
		} else {
			return data?.status ?? "Unknown";
		}
	};

	return (
		<p>
			<strong>Game Status:</strong> {gameStatus()}
		</p>
	);
}
