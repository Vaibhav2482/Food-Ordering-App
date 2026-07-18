import { Box, Chip, IconButton, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

function AddControl({ quantity, disabled, onIncrement, onDecrement }) {

    if (quantity === 0) {

        return (

            <Typography
                component="button"
                disabled={disabled}
                onClick={onIncrement}
                sx={{
                    all: "unset",
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 12,
                    color: disabled ? "text.disabled" : "#F58220",
                    cursor: disabled ? "default" : "pointer",
                    letterSpacing: 0.5
                }}
            >
                ADD
            </Typography>

        );

    }

    return (

        <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 0.25 }}>

            <IconButton size="small" onClick={onDecrement} sx={{ color: "#F58220", p: 0.25 }}>
                <RemoveRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <Typography fontWeight={700} fontSize={12} color="#F58220">
                {quantity}
            </Typography>

            <IconButton size="small" onClick={onIncrement} sx={{ color: "#F58220", p: 0.25 }}>
                <AddRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>

        </Box>

    );

}

function MenuItemRow({ item }) {

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
                display: "flex",
                alignItems: item.ImageUrl ? "flex-start" : "center",
                gap: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2.5 },
                opacity: item.IsAvailable ? 1 : 0.55
            }}
        >

            <Box sx={{ flex: 1, minWidth: 0 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>

                    <Typography fontWeight={700}>
                        {item.ItemName}
                    </Typography>

                    {item.IsPopular && (
                        <Chip label="Bestseller" size="small" color="warning" sx={{ height: 20, fontSize: 11 }} />
                    )}

                    {!item.IsAvailable && (
                        <Chip label="Unavailable" size="small" sx={{ height: 20, fontSize: 11 }} />
                    )}

                </Box>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontWeight: 700,
                        color: "#F58220"
                    }}
                >
                    {formatCurrency(item.Price)}
                </Typography>

                {item.Description && (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.75,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}
                    >
                        {item.Description}
                    </Typography>

                )}

            </Box>

            {item.ImageUrl ? (

                <Box sx={{ position: "relative", width: { xs: 84, sm: 112 }, flexShrink: 0 }}>

                    <Box
                        sx={{
                            width: { xs: 84, sm: 112 },
                            height: { xs: 72, sm: 96 },
                            borderRadius: 3,
                            overflow: "hidden"
                        }}
                    >

                        <Box
                            component="img"
                            src={item.ImageUrl}
                            alt={item.ItemName}
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -12,
                            left: "50%",
                            transform: "translateX(-50%)",
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2.5,
                            boxShadow: "0 2px 8px rgba(0,0,0,.12)",
                            display: "flex",
                            alignItems: "center",
                            height: 28,
                            minWidth: 72,
                            justifyContent: "center"
                        }}
                    >

                        <AddControl
                            quantity={quantity}
                            disabled={!item.IsAvailable}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                        />

                    </Box>

                </Box>

            ) : (

                <Box
                    sx={{
                        flexShrink: 0,
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        height: 30,
                        minWidth: 78,
                        justifyContent: "center"
                    }}
                >

                    <AddControl
                        quantity={quantity}
                        disabled={!item.IsAvailable}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />

                </Box>

            )}

        </Box>

    );

}

export default MenuItemRow;
