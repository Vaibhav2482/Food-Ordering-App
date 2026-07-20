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
//
// Every size below is driven by flex, with no fixed pixel widths on any
// step — that's deliberate. A fixed-width version needed more room than a
// phone screen has for 5-6 steps and had to scroll horizontally, which
// clipped the first step on load. This version always fits the card.
function OrderProgressTrack({ steps, activeIndex }) {

    return (

        <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>

            {steps.map((step, index) => {

                const isDone = index < activeIndex;
                const isCurrent = index === activeIndex;
                const isFilled = isDone || isCurrent;
                const Icon = STATUS_ICON[step];

                return (

                    <Box key={step} sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>

                        {/* flex-basis 0 + minWidth 0 is what actually lets this
                            shrink below the label's natural unwrapped width —
                            without minWidth:0, flex items refuse to shrink
                            past their content size and "Out For Delivery"
                            would force the whole row wider than the card. */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "3 1 0%", minWidth: 0 }}>

                            <Box
                                sx={{
                                    width: { xs: isCurrent ? 34 : 26, sm: isCurrent ? 44 : 36 },
                                    height: { xs: isCurrent ? 34 : 26, sm: isCurrent ? 44 : 36 },
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: isFilled ? DONE_BG : FUTURE_BG,
                                    color: isFilled ? "#fff" : FUTURE_FG,
                                    boxShadow: isCurrent ? "0 0 0 3px #FFE8D1" : "none",
                                    transition: "all .2s ease"
                                }}
                            >

                                {Icon && <Icon sx={{ fontSize: { xs: isCurrent ? 16 : 13, sm: isCurrent ? 22 : 18 } }} />}

                            </Box>

                            <Typography
                                sx={{
                                    mt: 0.5,
                                    fontSize: { xs: 9, sm: 11 },
                                    fontWeight: isCurrent ? 700 : 500,
                                    color: isFilled ? "text.primary" : FUTURE_FG,
                                    textAlign: "center",
                                    lineHeight: 1.2,
                                    px: 0.25
                                }}
                            >
                                {step}
                            </Typography>

                        </Box>

                        {index !== steps.length - 1 && (

                            <Box
                                sx={{
                                    flex: "1 1 0%",
                                    height: { xs: 2, sm: 3 },
                                    minWidth: 4,
                                    mb: { xs: "13px", sm: "20px" },
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
