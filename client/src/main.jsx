import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, CssBaseline } from "@mui/material";
// Default import only pulls weight 400; the theme uses 500-800 for every
// heading/button, which without these was rendering as browser-faked bold
// (thicker, blurrier) instead of the font's real bold glyphs.
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import App from "./App";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";
import { BranchProvider } from "./context/BranchContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <ThemeProvider theme={theme}>

            <CssBaseline />

            <Toaster
                position="top-center"
                toastOptions={{ duration: 2500 }}
            />

            <AuthProvider>

                <BranchProvider>

                    <CartProvider>

                        <App />

                    </CartProvider>

                </BranchProvider>

            </AuthProvider>

        </ThemeProvider>

    </React.StrictMode>
);
