import { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { loginPath } from "./routes";

interface IOwnProps {
	children: ReactNode;
	path: string;
	strict?: boolean;
	exact?: boolean;
}

export function PrivateRoute({ children, ...rest }: IOwnProps) {
	const auth = useAuth();

	return (
		<Route
			{...rest}
			render={() =>
				auth.currentUser === undefined ? <Redirect to={loginPath} /> : children
			}
		/>
	);
}
