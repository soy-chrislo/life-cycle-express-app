import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Provider from "./components/providers/Provider";

const root = document.getElementById("root");

if (root === null) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Provider />
	</React.StrictMode>,
);
