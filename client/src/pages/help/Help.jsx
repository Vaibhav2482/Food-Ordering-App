import { Card, Box, Container, Divider, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";

import { HELP_TOPICS } from "./helpContent";

function Help() {

    const navigate = useNavigate();

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Help
            </Typography>

            <Card>

                {HELP_TOPICS.map((topic, index) => (

                    <Box key={topic.slug}>

                        <Box
                            onClick={() => navigate(`/help/${topic.slug}`)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 2.5,
                                py: 2,
                                cursor: "pointer"
                            }}
                        >

                            <Typography fontWeight={500}>{topic.label}</Typography>

                            <ChevronRightRoundedIcon sx={{ color: "text.secondary" }} />

                        </Box>

                        {index !== HELP_TOPICS.length - 1 && <Divider />}

                    </Box>

                ))}

            </Card>

        </Container>

    );

}

export default Help;
