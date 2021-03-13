import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LoginLayout } from "./layout/login/LoginLayout";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { useAuth } from "./hooks/useAuth";
import { MainLayout } from "./layout/main/MainLayout";
import { GameLoading } from "./common/loading/GameLoading";
import { spaceTradersQueryClient } from "../spacetraders-api";

export function App() {
	const [isAutoLoginLoading, login, currentUser, logout] = useAuth();

	return (
		<QueryClientProvider client={spaceTradersQueryClient}>
			{isAutoLoginLoading ? (
				<GameLoading />
			) : currentUser === undefined ? (
				<LoginLayout onLogin={login} />
			) : (
				<CurrentUserProvider currentUser={currentUser}>
					<MainLayout onLogout={logout} />
				</CurrentUserProvider>
			)}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
