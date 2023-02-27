import { ReactElement } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { generateViewSystemMapPath } from "@/routes";
import { useSystemInfo } from "@/spacetraders-api/hooks/systems/useSystemInfo";

import { SystemMap } from "./map/SystemMap";
import { useAddVisitedSystem } from "./useAddVisitedSystem";
import { useKnownSystems } from "./useKnownSystems";
import styles from "./ViewSystemMap.module.css";

export function ViewSystemMap(): ReactElement {
	const { systemSymbol } = useParams();

	if (systemSymbol === undefined) {
		throw new Error("Missing 'systemSymbol' parameter.");
	}

	const result = useSystemInfo(systemSymbol);

	useAddVisitedSystem(result.data?.system.symbol);

	const knownSystems = useKnownSystems();

	return (
		<>
			<header className={styles.header}>
				{knownSystems.data.length > 1 && (
					<nav>
						{knownSystems.data.map((system) => (
							<NavLink
								key={system}
								to={generateViewSystemMapPath(system)}
								className={({ isActive }) => (isActive ? styles.active : "")}
								end
							>
								{system}
							</NavLink>
						))}
					</nav>
				)}
				<h1>{result.data?.system.name}</h1>
			</header>

			<SystemMap systemSymbol={systemSymbol} />
		</>
	);
}
