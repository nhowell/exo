import { ReactElement } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface IOwnProps {
	children: ReactElement;
	redirectTo: string;
}

export function RequireAuth({ children, redirectTo }: IOwnProps) {
	const auth = useAuth();

	return auth.currentUser === undefined ? (
		<Redirect to={redirectTo} />
	) : (
		children
	);
}
