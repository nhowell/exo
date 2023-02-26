import { useContext } from "react";

import { authContext } from "../app/AuthProvider";

export function useAuth() {
	return useContext(authContext);
}
