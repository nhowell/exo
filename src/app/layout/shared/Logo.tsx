import styles from "./Logo.module.css";
import classnames from "classnames";

interface IOwnProps {
	size: "normal" | "large";
}

export function Logo(props: IOwnProps) {
	return (
		<h1
			className={classnames(
				styles.logo,
				props.size === "large" && styles.large,
			)}
		>
			AstroCorp
		</h1>
	);
}
