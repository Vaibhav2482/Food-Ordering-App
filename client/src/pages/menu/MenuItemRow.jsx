import { Box, Chip, IconButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { getCategoryIcon } from "../../utils/categoryIcon";

const TINT_BG = "#FFE8D1";
const TINT_FG = "#F58220";

function AddControl({ quantity, disabled }) {

    if (quantity === 0) {

        return (

            <Box
                sx={{
                    px: 2.5,
                    py: 0.75,
                    borderRadius: 5,
                    bgcolor: disabled ? "action.disabledBackground" : TINT_BG,
                    color: disabled ? "text.disabled" : TINT_FG,
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 0.4,
                    textAlign: "center"
                }}
            >
                ADD
            </Box>

        );

    }

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                borderRadius: 5,
                bgcolor: TINT_BG,
                px: 0.5
            }}
        >

            <IconButton size="small" sx={{ color: TINT_FG, p: 0.5 }} data-decrement>
                <RemoveRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Typography fontWeight={700} fontSize={14} color={TINT_FG} sx={{ minWidth: 16, textAlign: "center" }}>
                {quantity}
            </Typography>

            <IconButton size="small" sx={{ color: TINT_FG, p: 0.5 }} data-increment>
                <AddRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>

        </Box>

    );

}

function MenuItemRow({ item, onSelect }) {

    const { items, addItem, updateQuantity, removeItem } = useCart();

    const cartItem = items.find((cartLine) => cartLine.menuItemId === item.MenuItemId);
    const quantity = cartItem?.quantity ?? 0;

    const CategoryIcon = getCategoryIcon(item.CategoryName);

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
            onClick={() => onSelect?.(item)}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 2,
                py: { xs: 2, sm: 2.5 },
                opacity: item.IsAvailable ? 1 : 0.55,
                cursor: onSelect ? "pointer" : "default"
            }}
        >

            <Box sx={{ flex: 1, minWidth: 0 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>

                    <Typography fontWeight={700} fontSize={16}>
                        {item.ItemName}
                    </Typography>

                    {item.IsPopular && (
                        <Chip label="Bestseller" size="small" color="warning" sx={{ height: 20, fontSize: 11 }} />
                    )}

                    {!item.IsAvailable && (
                        <Chip label="Unavailable" size="small" sx={{ height: 20, fontSize: 11 }} />
                    )}

                </Box>

                {item.Description && (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}
                    >
                        {item.Description}
                    </Typography>

                )}

                <Typography sx={{ mt: 1, fontWeight: 700, fontSize: 15, color: TINT_FG }}>
                    {formatCurrency(item.Price)}
                </Typography>

            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flexShrink: 0 }}>

                <Box
                    sx={{
                        width: { xs: 84, sm: 100 },
                        height: { xs: 72, sm: 84 },
                        borderRadius: 3,
                        overflow: "hidden",
                        bgcolor: item.ImageUrl ? "transparent" : "#FFF3E4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    {item.ImageUrl ? (

                        <Box
                            component="img"
                            src={item.ImageUrl}
                            alt={item.ItemName}
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                    ) : (

                        <CategoryIcon sx={{ fontSize: 32, color: "#F58220", opacity: 0.45 }} />

                    )}

                </Box>

                <Box
                    onClick={(event) => {

                        event.stopPropagation();

                        if (item.IsAvailable === false) {
                            return;
                        }

                        const target = event.target.closest("[data-increment],[data-decrement]");

                        if (target) {
                            target.hasAttribute("data-increment") ? handleIncrement() : handleDecrement();
                        } else if (quantity === 0) {
                            handleIncrement();
                        }

                    }}
                    sx={{ cursor: item.IsAvailable === false ? "default" : "pointer" }}
                >

                    <AddControl quantity={quantity} disabled={!item.IsAvailable} />

                </Box>

            </Box>

        </Box>

    );

}

export default MenuItemRow;
