import { render, screen } from "@testing-library/react";
import { App } from "./App";

it("renders Server Status text", () => {
	render(<App />);
	const element = screen.getByText(/Server Status/i);
	expect(element).toBeInTheDocument();
});
