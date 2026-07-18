import { Box, Chip, Container, Stack, Typography } from "@mui/material";

import logo from "../../assets/logo/chaichakhna-logo.jpg";

const TRUST_POINTS = ["Pure Vegetarian", "Hygienic & Clean", "No Refined Oil, No Additives", "No Food Color"];

function Footer() {

    return (

        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 4,
                borderTop: "1px solid #E5E7EB",
                bgcolor: "#FFFFFF"
            }}
        >

            <Container maxWidth="lg">

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

                    <Box component="img" src={logo} alt="ChaiChakhna Company" sx={{ height: 36, width: 36, objectFit: "contain" }} />

                    <Typography variant="h6" fontWeight={800} sx={{ color: "#F58220" }}>
                        Chai Chakhna Company
                    </Typography>

                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Fresh chai and snacks, delivered hot to your door.
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>

                    {TRUST_POINTS.map((point) => (
                        <Chip key={point} label={point} size="small" variant="outlined" sx={{ borderColor: "#F58220", color: "#0F766E" }} />
                    ))}

                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    &copy; {new Date().getFullYear()} ChaiChakhna Company. All rights reserved.
                </Typography>

            </Container>

        </Box>

    );

}

export default Footer;
