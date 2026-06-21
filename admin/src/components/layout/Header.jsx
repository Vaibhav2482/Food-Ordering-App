import { Box, Typography } from "@mui/material";

function Header() {

    return (

        <Box
            sx={{
                height: 72,
                borderBottom: "1px solid #2A2A2A",
                display: "flex",
                alignItems: "center",
                px: 4,
                backgroundColor: "#161616"
            }}
        >

            <Typography variant="h6">

                Admin Panel

            </Typography>

        </Box>

    );

}

export default Header;