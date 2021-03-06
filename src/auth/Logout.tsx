interface IOwnProps {
	onLogout(): void;
}

export function Logout(props: IOwnProps) {
	return (
		<button type="submit" onClick={props.onLogout}>
			Logout
		</button>
	);
}
