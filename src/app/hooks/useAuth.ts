import { useContext } from "react";

import { authContext } from "../AuthProvider";

export function useAuth() {
	return useContext(authContext);
}
