import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({
    title,
    value,
    icon,
    color,
    subtitle
}) {

    return (

        <Card>

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                            mt={1}
                        >
                            {value}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                        >
                            {subtitle}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            width: 58,
                            height: 58,
                            borderRadius: 3,
                            bgcolor: `${color}15`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color
                        }}
                    >
                        {icon}
                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}

export default StatCard;