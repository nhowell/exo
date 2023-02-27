import { Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginLayout } from "@/components/layout/login/LoginLayout";
import { MainLayout } from "@/components/layout/main/MainLayout";
import { GameLoading } from "@/components/loading/GameLoading";
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";
import { AuthProvider } from "@/providers/AuthProvider";
import { CurrentDateTimeProvider } from "@/providers/CurrentDateTimeProvider";
import { SpaceTradersApiProvider } from "@/providers/SpaceTradersApiProvider";
import { spaceTradersQueryClient } from "@/spacetraders-api/hooks/spaceTradersQueryClient";
import { lazyImport } from "@/utils/lazyImport";

import { NotFound } from "./NotFound";
import { RequireAuth } from "./RequireAuth";
import { loginPath, routes, viewSystemMapPath } from "./routes";

const { ViewSystemMap } = lazyImport(
	() => import("@/features/systems"),
	"ViewSystemMap",
);

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
											<Suspense fallback={<GameLoading />}>
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
																			element={
																				<Suspense fallback={<LoadingSpinner />}>
																					<route.component />
																				</Suspense>
																			}
																		/>
																	))}
																	<Route path="*" element={<NotFound />} />
																</Routes>
															</MainLayout>
														}
													/>
												</Routes>
											</Suspense>
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
