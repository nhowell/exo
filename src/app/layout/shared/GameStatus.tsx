import classNames from "classnames";
import { useMemo } from "react";
import { t } from "../../../helpers/translate";
import { useGameStatus } from "../../../spacetraders-api/game/getGameStatus";
import styles from "./GameStatus.module.css";

interface IGameStatus {
	code: "ONLINE" | "OFFLINE" | "LOADING";
	message: string;
}

export function GameStatus() {
	const { isLoading, isError, data: status } = useGameStatus();

	const gameStatus: IGameStatus = useMemo(() => {
		if (isLoading) {
			return { code: "LOADING", message: "Checking server status..." };
		} else if (isError) {
			return {
				code: "OFFLINE",
				message: "Could not connect to game server or server is offline",
			};
		} else {
			return { code: "ONLINE", message: status ?? "Online" };
		}
	}, [isError, isLoading, status]);

	return (
		<span
			className={classNames(
				styles.gameStatus,
				gameStatus.code === "ONLINE" && styles.online,
				gameStatus.code === "OFFLINE" && styles.offline,
			)}
			title={t(gameStatus.message)}
		></span>
	);
}
