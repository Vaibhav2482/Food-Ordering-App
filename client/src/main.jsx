import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/plus-jakarta-sans";

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
