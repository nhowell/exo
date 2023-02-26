import { useContext } from "react";

import { authContext } from "@/providers/AuthProvider";

export function useAuth() {
	return useContext(authContext);
}
