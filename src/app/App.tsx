import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginLayout } from "./layout/login/LoginLayout";
import { MainLayout } from "./layout/main/MainLayout";
import { spaceTradersQueryClient } from "../spacetraders-api";
import { AuthProvider } from "./AuthProvider";
import { loginPath, routes } from "./routes";
import { PrivateRoute } from "./PrivateRoute";
import { NotFound } from "./NotFound";
import { CurrentDateTimeProvider } from "./CurrentDateTimeProvider";

export function App() {
	return (
		<QueryClientProvider client={spaceTradersQueryClient}>
			<BrowserRouter>
				<AuthProvider>
					<Switch>
						<Route exact path={loginPath}>
							<LoginLayout />
						</Route>
						<PrivateRoute path="*">
							<MainLayout>
								<CurrentDateTimeProvider>
									<Switch>
										{routes.map((route) => (
											<Route key={route.path} path={route.path} exact>
												<route.component />
											</Route>
										))}
										<Route path="*">
											<NotFound />
										</Route>
									</Switch>
								</CurrentDateTimeProvider>
							</MainLayout>
						</PrivateRoute>
					</Switch>
				</AuthProvider>
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
