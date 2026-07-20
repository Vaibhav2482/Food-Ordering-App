import { Box, Chip, Drawer, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { getCategoryIcon } from "../../utils/categoryIcon";

const TINT_BG = "#FFE8D1";
const TINT_FG = "#F58220";

// Tapping an item row opens this for the full picture — real image or a
// large category illustration, the complete (unclamped) description, and a
// bigger quantity control. The row's own Add button still adds instantly
// without opening this, so quick-adding a known favorite stays one tap.
function MenuItemDetailSheet({ item, open, onClose }) {

    const { items, addItem, updateQuantity, removeItem } = useCart();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (!item) {
        return null;
    }

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

    const CategoryIcon = getCategoryIcon(item.CategoryName);

    return (

        <Drawer
            anchor={isMobile ? "bottom" : "right"}
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: isMobile
                        ? { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "88vh" }
                        : { width: 420, maxWidth: "100vw" }
                }
            }}
        >

            <Box sx={{ position: "relative" }}>

                {item.ImageUrl ? (

                    <Box
                        component="img"
                        src={item.ImageUrl}
                        alt={item.ItemName}
                        sx={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                    />

                ) : (

                    <Box
                        sx={{
                            width: "100%",
                            height: 180,
                            bgcolor: "#FFF3E4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <CategoryIcon sx={{ fontSize: 72, color: TINT_FG, opacity: 0.5 }} />
                    </Box>

                )}

                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "background.paper",
                        boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                        "&:hover": { bgcolor: "background.paper" }
                    }}
                >
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>

            </Box>

            <Box sx={{ p: { xs: 2.5, sm: 3 }, display: "flex", flexDirection: "column", gap: 1.5 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>

                    <Typography variant="h6" fontWeight={700}>
                        {item.ItemName}
                    </Typography>

                    {item.IsPopular && (
                        <Chip label="Bestseller" size="small" color="warning" sx={{ fontWeight: 700 }} />
                    )}

                    {!item.IsAvailable && (
                        <Chip label="Unavailable" size="small" />
                    )}

                </Box>

                <Typography variant="h6" fontWeight={700} sx={{ color: TINT_FG }}>
                    {formatCurrency(item.Price)}
                </Typography>

                {item.Description && (
                    <Typography color="text.secondary">
                        {item.Description}
                    </Typography>
                )}

                <Box sx={{ mt: 1 }}>

                    {quantity === 0 ? (

                        <Box
                            component="button"
                            disabled={!item.IsAvailable}
                            onClick={handleIncrement}
                            sx={{
                                all: "unset",
                                display: "block",
                                width: "100%",
                                textAlign: "center",
                                py: 1.5,
                                borderRadius: 5,
                                bgcolor: item.IsAvailable ? TINT_BG : "action.disabledBackground",
                                color: item.IsAvailable ? TINT_FG : "text.disabled",
                                fontWeight: 700,
                                fontSize: 15,
                                letterSpacing: 0.4,
                                cursor: item.IsAvailable ? "pointer" : "default"
                            }}
                        >
                            ADD TO CART
                        </Box>

                    ) : (

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                bgcolor: TINT_BG,
                                borderRadius: 5,
                                py: 1
                            }}
                        >

                            <IconButton onClick={handleDecrement} sx={{ color: TINT_FG }}>
                                <RemoveRoundedIcon />
                            </IconButton>

                            <Typography fontWeight={700} fontSize={18} color={TINT_FG} sx={{ minWidth: 24, textAlign: "center" }}>
                                {quantity}
                            </Typography>

                            <IconButton onClick={handleIncrement} sx={{ color: TINT_FG }}>
                                <AddRoundedIcon />
                            </IconButton>

                        </Box>

                    )}

                </Box>

            </Box>

        </Drawer>

    );

}

export default MenuItemDetailSheet;
