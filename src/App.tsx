import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";
import { useGameStatus } from "./spacetraders-api/game/useGameStatus";
import { UserInfo } from "./UserInfo/UserInfo";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

interface ICurrentUserContext {
	username: string;
}

export const CurrentUserContext = React.createContext<ICurrentUserContext>({
	username: "",
});

function App() {
	const [auth, login, logout] = useAuth();

	const currentUser: ICurrentUserContext = useMemo(() => {
		return { username: auth?.username ?? "" };
	}, [auth?.username]);

	return (
		<QueryClientProvider client={queryClient}>
			<CurrentUserContext.Provider value={currentUser}>
				<h1>SpaceTraders</h1>
				<GameStatus />
				{auth?.username ? (
					<>
						<Logout onLogout={logout} />
						<UserInfo />
					</>
				) : (
					<Login onLogin={login} />
				)}
			</CurrentUserContext.Provider>
		</QueryClientProvider>
	);
}

function GameStatus() {
	const { isLoading, isError, data } = useGameStatus();

	return isLoading ? (
		<span>Loading...</span>
	) : isError ? (
		<span>
			<strong>Error:</strong>
		</span>
	) : (
		<span>
			<strong>Status:</strong> {data?.status}
		</span>
	);
}

export default App;
