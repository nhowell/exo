import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./auth/Login";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { useAuth } from "./hooks/useAuth";
import { MainLayout } from "./layout/MainLayout";

const queryClient = new QueryClient();

export function App() {
	const [auth, login, logout] = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			{auth === undefined ? (
				<Login onLogin={login} />
			) : (
				<CurrentUserProvider auth={auth}>
					<MainLayout onLogout={logout} />
				</CurrentUserProvider>
			)}
		</QueryClientProvider>
	);
}
