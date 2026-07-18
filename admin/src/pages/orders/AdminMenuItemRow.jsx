import { Box, Chip, IconButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

function AdminMenuItemRow({ item, quantity, onIncrement, onDecrement }) {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 0.75,
                borderBottom: "1px solid",
                borderColor: "divider"
            }}
        >

            <Box sx={{ flex: 1, minWidth: 0 }}>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>

                    <Typography fontWeight={600} variant="body2" noWrap>
                        {item.ItemName}
                    </Typography>

                    <Typography variant="body2" fontWeight={700} color="#F58220">
                        ₹ {Number(item.Price).toFixed(2)}
                    </Typography>

                    {item.IsPopular && (
                        <Chip label="Bestseller" size="small" color="warning" sx={{ height: 18, fontSize: 10 }} />
                    )}

                </Box>

            </Box>

            <Box
                sx={{
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    height: 28,
                    minWidth: 68,
                    justifyContent: "center",
                    flexShrink: 0
                }}
            >

                {quantity === 0 ? (

                    <Typography
                        component="button"
                        onClick={() => onIncrement(item)}
                        sx={{
                            all: "unset",
                            width: "100%",
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: 12,
                            color: "#F58220",
                            cursor: "pointer",
                            letterSpacing: 0.5
                        }}
                    >
                        ADD
                    </Typography>

                ) : (

                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 0.25 }}>

                        <IconButton size="small" onClick={() => onDecrement(item)} sx={{ color: "#F58220", p: 0.25 }}>
                            <RemoveRoundedIcon fontSize="small" />
                        </IconButton>

                        <Typography fontWeight={700} fontSize={12} color="#F58220">
                            {quantity}
                        </Typography>

                        <IconButton size="small" onClick={() => onIncrement(item)} sx={{ color: "#F58220", p: 0.25 }}>
                            <AddRoundedIcon fontSize="small" />
                        </IconButton>

                    </Box>

                )}

            </Box>

        </Box>

    );

}

export default AdminMenuItemRow;
