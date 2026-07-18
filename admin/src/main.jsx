import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/plus-jakarta-sans";
import App from "./App";

import theme from "./theme/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <ThemeProvider theme={theme}>

            <CssBaseline />

            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 2500
                }}
            />

            <App />

        </ThemeProvider>

    </React.StrictMode>
);