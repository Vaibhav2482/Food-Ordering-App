import { Box, Typography } from "@mui/material";

import { STATUS_ICON } from "../../utils/orderStatus";

const DONE_BG = "#F58220";
const FUTURE_BG = "#F3F4F6";
const FUTURE_FG = "#9CA3AF";

// The icon-circles-joined-by-a-line pattern used by Swiggy/Zomato/Uber Eats:
// each stage is an icon, not a number, and the line between two stages fills
// solid once the earlier one is done. The current stage's name is shown once
// as the screen's headline (in the hero above) — repeating it as a step
// label here would just duplicate that text.
function OrderProgressTrack({ steps, activeIndex }) {

    return (

        <Box sx={{ display: "flex", alignItems: "flex-start" }}>

            {steps.map((step, index) => {

                const isDone = index < activeIndex;
                const isCurrent = index === activeIndex;
                const isFilled = isDone || isCurrent;
                const Icon = STATUS_ICON[step];

                return (

                    <Box key={step} sx={{ display: "flex", alignItems: "center", flex: index === steps.length - 1 ? "0 0 auto" : 1 }}>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>

                            <Box
                                sx={{
                                    width: isCurrent ? 44 : 36,
                                    height: isCurrent ? 44 : 36,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: isFilled ? DONE_BG : FUTURE_BG,
                                    color: isFilled ? "#fff" : FUTURE_FG,
                                    boxShadow: isCurrent ? "0 0 0 4px #FFE8D1" : "none",
                                    transition: "all .2s ease"
                                }}
                            >

                                {Icon && <Icon sx={{ fontSize: isCurrent ? 22 : 18 }} />}

                            </Box>

                            <Typography
                                sx={{
                                    mt: 0.75,
                                    fontSize: 11,
                                    fontWeight: isCurrent ? 700 : 500,
                                    color: isFilled ? "text.primary" : FUTURE_FG,
                                    textAlign: "center",
                                    width: 64,
                                    lineHeight: 1.2
                                }}
                            >
                                {step}
                            </Typography>

                        </Box>

                        {index !== steps.length - 1 && (

                            <Box
                                sx={{
                                    flex: 1,
                                    height: 3,
                                    minWidth: 12,
                                    mb: "20px",
                                    borderRadius: 2,
                                    bgcolor: isDone ? DONE_BG : FUTURE_BG
                                }}
                            />

                        )}

                    </Box>

                );

            })}

        </Box>

    );

}

export default OrderProgressTrack;
