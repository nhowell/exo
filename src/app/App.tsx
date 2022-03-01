import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginLayout } from "./layout/login/LoginLayout";
import { MainLayout } from "./layout/main/MainLayout";
import { spaceTradersQueryClient } from "../spacetraders-api/hooks/spaceTradersQueryClient";
import { AuthProvider } from "./AuthProvider";
import { loginPath, routes, viewSystemMapPath } from "./routes";
import { RequireAuth } from "./RequireAuth";
import { NotFound } from "./NotFound";
import { CurrentDateTimeProvider } from "./CurrentDateTimeProvider";
import { SpaceTradersApiProvider } from "./SpaceTradersApiProvider";
import { ViewSystemMap } from "./systems/ViewSystemMap";

export function App() {
	return (
		<QueryClientProvider client={spaceTradersQueryClient}>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path={loginPath} element={<LoginLayout />} />
						<Route
							path="*"
							element={
								<RequireAuth redirectTo={loginPath}>
									<SpaceTradersApiProvider>
										<CurrentDateTimeProvider>
											<Routes>
												<Route
													path={viewSystemMapPath}
													element={<ViewSystemMap />}
												/>
												<Route
													path="*"
													element={
														<MainLayout>
															<Routes>
																{routes.map((route) => (
																	<Route
																		key={route.path}
																		path={route.path}
																		element={<route.component />}
																	/>
																))}
																<Route path="*" element={<NotFound />} />
															</Routes>
														</MainLayout>
													}
												/>
											</Routes>
										</CurrentDateTimeProvider>
									</SpaceTradersApiProvider>
								</RequireAuth>
							}
						/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
