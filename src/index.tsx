import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { App } from "./App";

const container = document.getElementById("root");

if (container === null) {
	throw new Error("Root container element missing.");
}

const root = createRoot(container);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
