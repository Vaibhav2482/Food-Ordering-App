import { Box, Typography } from "@mui/material";

function Sidebar() {

    return (

        <Box
            sx={{
                width: 280,
                backgroundColor: "#161616",
                borderRight: "1px solid #2A2A2A",
                p: 3
            }}
        >

            <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
            >
                ChaiChakhna
            </Typography>

        </Box>

    );

}

export default Sidebar;