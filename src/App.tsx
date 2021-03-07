import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LoginLayout } from "./layout/login/LoginLayout";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { useAuth } from "./hooks/useAuth";
import { MainLayout } from "./layout/main/MainLayout";

export const queryClient = new QueryClient();

export function App() {
	const [auth, login, logout] = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			{auth === undefined ? (
				<LoginLayout onLogin={login} />
			) : (
				<CurrentUserProvider auth={auth}>
					<MainLayout onLogout={logout} />
				</CurrentUserProvider>
			)}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
