import { ReactElement, useState } from "react";

import styles from "./Tabs.module.css";
import { AtLeastOneTabPane, ITabPane } from "./types";

interface IOwnProps {
	panes: AtLeastOneTabPane;
	initialActiveTabKey?: ITabPane["key"];
}

export function Tabs(props: IOwnProps): ReactElement {
	const [activeTabKey, setActiveTabKey] = useState<ITabPane["key"]>(
		props.initialActiveTabKey ?? props.panes[0].key,
	);

	const activeTabPane =
		props.panes.find((x) => x.key === activeTabKey) ?? props.panes[0];

	return (
		<>
			<ul className={styles.tabList}>
				{props.panes.map((pane) => (
					<li key={pane.key}>
						<a
							href={`#${pane.key}`}
							onClick={() => setActiveTabKey(pane.key)}
							className={
								pane.key === activeTabPane.key ? styles.activeTab : undefined
							}
						>
							{pane.label}
						</a>
					</li>
				))}
			</ul>

			{activeTabPane.content}
		</>
	);
}
