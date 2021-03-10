import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LoginLayout } from "./layout/login/LoginLayout";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { useAuth } from "./hooks/useAuth";
import { MainLayout } from "./layout/main/MainLayout";
import { GameLoading } from "./common/loading/GameLoading";

export const queryClient = new QueryClient();

export function App() {
	const [isAutoLoginLoading, login, userInfo, logout] = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			{isAutoLoginLoading ? (
				<GameLoading />
			) : userInfo === undefined ? (
				<LoginLayout onLogin={login} />
			) : (
				<CurrentUserProvider initialUserInfo={userInfo}>
					<MainLayout onLogout={logout} />
				</CurrentUserProvider>
			)}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
