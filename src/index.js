import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { SnackProvider } from "./context/SnackContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<SnackProvider>
				<BrowserRouter>
					<Routes>
						<Route path={"/*"} element={<App />} />
					</Routes>
				</BrowserRouter>
			</SnackProvider>
		</ThemeProvider>
	</React.StrictMode>
);
