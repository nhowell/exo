import styles from "./Logo.module.css";
import classnames from "classnames";
import { APP_NAME } from "../../constants";

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
			{APP_NAME}
		</h1>
	);
}
