import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout({ children }) {

    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#0F0F0F"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Header />

                <Box
                    sx={{
                        flex: 1,
                        p: 3
                    }}
                >
                    {children}
                </Box>

            </Box>

        </Box>

    );

}

export default MainLayout;