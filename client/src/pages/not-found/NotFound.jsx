import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {

    return (

        <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>

            <Typography variant="h1" fontWeight={800} sx={{ color: "#F58220" }}>
                404
            </Typography>

            <Typography variant="h5" sx={{ mt: 1 }}>
                Page not found
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
                The page you&apos;re looking for doesn&apos;t exist.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>

                <Button variant="contained" component={RouterLink} to="/">
                    Go Home
                </Button>

                <Button variant="outlined" component={RouterLink} to="/menu">
                    Browse Menu
                </Button>

            </Box>

        </Container>

    );

}

export default NotFound;
