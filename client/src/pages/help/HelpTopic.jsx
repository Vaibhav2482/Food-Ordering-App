import { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Typography
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useParams } from "react-router-dom";

import { getHelpTopic } from "./helpContent";

function HelpTopic() {

    const { slug } = useParams();
    const navigate = useNavigate();

    const topic = getHelpTopic(slug);

    const [expanded, setExpanded] = useState(0);

    if (!topic) {

        return (

            <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>

                <Typography>Topic not found.</Typography>

                <Button sx={{ mt: 2 }} onClick={() => navigate("/help")}>
                    Back to Help
                </Button>

            </Container>

        );

    }

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: { xs: 2, md: 3 } }}>

                <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate("/help")}>
                    Help
                </Button>

            </Box>

            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                {topic.label}
            </Typography>

            {topic.items.map((item, index) => (

                <Accordion
                    key={item.q}
                    expanded={expanded === index}
                    onChange={() => setExpanded(expanded === index ? -1 : index)}
                    sx={{ mb: 1.5, borderRadius: 3, "&:before": { display: "none" } }}
                >

                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                        <Typography fontWeight={700}>{item.q}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                            {item.a}
                        </Typography>
                    </AccordionDetails>

                </Accordion>

            ))}

        </Container>

    );

}

export default HelpTopic;
