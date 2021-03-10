import styles from "./LoadingSpinner.module.css";

interface IOwnProps {
	size?: "small";
}

export function LoadingSpinner(props: IOwnProps) {
	const diameter = props.size === "small" ? "1.8rem" : "4rem";

	return (
		<svg
			className={styles.loader}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width={diameter}
			height={diameter}
			viewBox="0 0 50 50"
			xmlSpace="preserve"
		>
			<path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
				<animateTransform
					attributeType="xml"
					attributeName="transform"
					type="rotate"
					from="0 25 25"
					to="360 25 25"
					dur="0.6s"
					repeatCount="indefinite"
				/>
			</path>
		</svg>
	);
}
