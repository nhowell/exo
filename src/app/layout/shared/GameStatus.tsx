import { useGameStatus } from "../../../spacetraders-api/game/getGameStatus";
import { LoadingSpinner } from "../../common/loading/LoadingSpinner";

export function GameStatus() {
	const { isLoading, isError, data: status } = useGameStatus();

	const gameStatus = () => {
		if (isLoading) {
			return <LoadingSpinner size="small" />;
		} else if (isError) {
			return "Could not connect to game server or server is offline.";
		} else {
			return status ?? "Unknown";
		}
	};

	return (
		<p>
			<strong>Game Status:</strong> {gameStatus()}
		</p>
	);
}
