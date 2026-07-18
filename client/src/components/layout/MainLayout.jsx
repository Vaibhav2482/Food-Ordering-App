import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import BottomNav from "./BottomNav";

function MainLayout() {

    const [cartOpen, setCartOpen] = useState(false);

    return (

        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

            <Navbar onCartClick={() => setCartOpen(true)} />

            <Box sx={{ flexGrow: 1, pb: { xs: 8, md: 0 } }}>

                <Outlet />

            </Box>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Footer />
            </Box>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

            <BottomNav onCartClick={() => setCartOpen(true)} />

        </Box>

    );

}

export default MainLayout;
