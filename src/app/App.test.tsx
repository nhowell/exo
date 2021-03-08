import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders header", () => {
	render(<App />);
	const element = screen.getByText(/SpaceTraders/i);
	expect(element).toBeInTheDocument();
});
