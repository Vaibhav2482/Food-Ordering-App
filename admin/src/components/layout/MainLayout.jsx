import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout() {

    const [mobileOpen, setMobileOpen] = useState(false);

    return (

        <Box
            sx={{
                display: "flex",
                height: "100vh",
                bgcolor: "#F5F6FA"
            }}
        >

            <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#F5F6FA",
                    minWidth: 0,
                    height: "100vh"
                }}
            >

                <Header onMenuClick={() => setMobileOpen(true)} />

                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 2, md: 3 },
                        bgcolor: "#F5F6FA",
                        overflowY: "auto"
                    }}
                >

                    <Outlet />

                </Box>

            </Box>

        </Box>

    );

}

export default MainLayout;
