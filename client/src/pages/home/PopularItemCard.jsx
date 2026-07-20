import { Box, IconButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

// Small tinted discovery card (matches the "complete your meal with" upsell
// style) — used for "Recommended for you" instead of a full list row, since
// these are meant to be browsed at a glance, not read in detail.
function PopularItemCard({ item }) {

    const { items, addItem, updateQuantity, removeItem } = useCart();

    const cartItem = items.find((cartLine) => cartLine.menuItemId === item.MenuItemId);
    const quantity = cartItem?.quantity ?? 0;

    const handleIncrement = () => addItem(item, 1);

    const handleDecrement = () => {

        if (!cartItem) {
            return;
        }

        if (quantity <= 1) {
            removeItem(cartItem);
        } else {
            updateQuantity(cartItem, quantity - 1);
        }

    };

    return (

        <Box
            sx={{
                flexShrink: 0,
                width: 156,
                minHeight: 96,
                borderRadius: 3,
                bgcolor: "#FFF3E4",
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: item.IsAvailable ? 1 : 0.55
            }}
        >

            <Typography
                fontWeight={700}
                fontSize={14}
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                }}
            >
                {item.ItemName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>

                <Typography fontWeight={700} fontSize={14}>
                    {formatCurrency(item.Price)}
                </Typography>

                {quantity === 0 ? (

                    <IconButton
                        size="small"
                        disabled={!item.IsAvailable}
                        onClick={handleIncrement}
                        sx={{
                            bgcolor: "background.paper",
                            boxShadow: "0 2px 6px rgba(0,0,0,.12)",
                            color: "#F58220",
                            "&:hover": { bgcolor: "background.paper" }
                        }}
                    >
                        <AddRoundedIcon fontSize="small" />
                    </IconButton>

                ) : (

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.25,
                            bgcolor: "background.paper",
                            borderRadius: 5,
                            boxShadow: "0 2px 6px rgba(0,0,0,.12)"
                        }}
                    >

                        <IconButton size="small" onClick={handleDecrement} sx={{ color: "#F58220", p: 0.5 }}>
                            <RemoveRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>

                        <Typography fontWeight={700} fontSize={13} color="#F58220" sx={{ minWidth: 14, textAlign: "center" }}>
                            {quantity}
                        </Typography>

                        <IconButton size="small" onClick={handleIncrement} sx={{ color: "#F58220", p: 0.5 }}>
                            <AddRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>

                    </Box>

                )}

            </Box>

        </Box>

    );

}

export default PopularItemCard;
