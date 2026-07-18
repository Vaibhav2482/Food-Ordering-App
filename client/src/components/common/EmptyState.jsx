import { Box, Button, Typography } from "@mui/material";

function EmptyState({ icon, title, subtitle, actionLabel, onAction }) {

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                py: 8,
                px: 2
            }}
        >

            {icon}

            <Typography variant="h6" sx={{ mt: 2 }}>
                {title}
            </Typography>

            {subtitle && (
                <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 400 }}>
                    {subtitle}
                </Typography>
            )}

            {actionLabel && onAction && (
                <Button variant="contained" sx={{ mt: 3 }} onClick={onAction}>
                    {actionLabel}
                </Button>
            )}

        </Box>

    );

}

export default EmptyState;
