import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout({ children }) {

    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#F5F6FA"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#F5F6FA"
                }}
            >

                <Header />

                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        bgcolor: "#F5F6FA"
                    }}
                >
                    {children}
                </Box>

            </Box>

        </Box>

    );

}

export default MainLayout;