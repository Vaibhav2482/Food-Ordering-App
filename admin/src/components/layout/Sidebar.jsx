import {
    Box,
    Typography,
    Divider
} from "@mui/material";

function Sidebar() {

    return (

        <Box
            sx={{
                width: 280,
                height: "100vh",
                bgcolor: "#FFFFFF",
                borderRight: "1px solid #E5E7EB",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <Box
                sx={{
                    px: 3,
                    py: 3
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        color: "#F58220"
                    }}
                >
                    ChaiChakhna
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6B7280",
                        mt: 0.5
                    }}
                >
                    Restaurant Management
                </Typography>

            </Box>

            <Divider />

            <Box
                sx={{
                    flex: 1,
                    p: 2
                }}
            >

                <Typography
                    sx={{
                        color: "#9CA3AF",
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        mb: 2
                    }}
                >
                    Main Menu
                </Typography>

            </Box>

        </Box>

    );

}

export default Sidebar;