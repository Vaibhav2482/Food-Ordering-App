import { Box, Typography } from "@mui/material";

import { STATUS_ICON, STATUS_TINT } from "../../utils/orderStatus";

// Icon-in-a-tinted-circle + label, used on order cards (small) and the
// order-detail hero (large). Replaces a plain colored Chip with something
// closer to how the status reads at a glance.
function OrderStatusBadge({ status, size = "small" }) {

    const Icon = STATUS_ICON[status];
    const tint = STATUS_TINT[status] || { bg: "#F3F4F6", fg: "#374151" };

    const circleSize = size === "large" ? 52 : 30;
    const iconSize = size === "large" ? 28 : 16;
    const fontSize = size === "large" ? 16 : 12;

    return (

        <Box sx={{ display: "flex", alignItems: "center", gap: size === "large" ? 1.5 : 0.75 }}>

            <Box
                sx={{
                    width: circleSize,
                    height: circleSize,
                    borderRadius: "50%",
                    bgcolor: tint.bg,
                    color: tint.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                }}
            >

                {Icon && <Icon sx={{ fontSize: iconSize }} />}

            </Box>

            <Typography sx={{ color: tint.fg, fontWeight: 700, fontSize }}>
                {status}
            </Typography>

        </Box>

    );

}

export default OrderStatusBadge;
