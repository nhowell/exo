import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import { App } from "./App";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<App />, div);
});

it("renders Server Status text", () => {
	render(<App />);
	const element = screen.getByText(/Server Status/i);
	expect(element).toBeInTheDocument();
});
