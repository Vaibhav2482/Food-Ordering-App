import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

const TINT_FG = "#F58220";

function CartDrawer({ open, onClose }) {

    const { items, subtotal, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const goToCheckout = () => {

        onClose();
        navigate("/checkout");

    };

    return (

        <Drawer
            anchor={isMobile ? "bottom" : "right"}
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: isMobile
                        ? { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "75vh" }
                        : {}
                }
            }}
        >

            <Box
                sx={{
                    width: { xs: "100%", sm: 380 },
                    maxWidth: "100vw",
                    p: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    height: { xs: "auto", sm: "100%" }
                }}
            >

                <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "center", mb: 1 }}>
                    <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: "#E5E7EB" }} />
                </Box>

                <Typography variant="h6" fontWeight={700} sx={{ mb: { xs: 1.5, sm: 2 } }}>
                    Your Cart
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {items.length === 0 ? (

                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 6 } }}>

                        <ShoppingCartRoundedIcon sx={{ fontSize: 48, color: "text.secondary" }} />

                        <Typography color="text.secondary" sx={{ mt: 2 }}>
                            Your cart is empty.
                        </Typography>

                    </Box>

                ) : (

                    <Box sx={{ flexGrow: { xs: 0, sm: 1 }, maxHeight: { xs: "40vh", sm: "none" }, overflowY: "auto" }}>

                        <Stack spacing={2}>

                            {items.map((item) => (

                                <Box key={item.key}>

                                    <Typography fontWeight={700}>{item.itemName}</Typography>

                                    <Typography variant="body2" sx={{ fontWeight: 700, color: TINT_FG }}>
                                        {formatCurrency(item.price)} each
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.75 }}>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "#FFE8D1", borderRadius: 5, px: 0.5 }}>

                                            <IconButton
                                                size="small"
                                                onClick={() => updateQuantity(item, item.quantity - 1)}
                                                sx={{ color: TINT_FG }}
                                            >
                                                <RemoveRoundedIcon fontSize="small" />
                                            </IconButton>

                                            <Typography fontWeight={700} color={TINT_FG} sx={{ minWidth: 20, textAlign: "center" }}>
                                                {item.quantity}
                                            </Typography>

                                            <IconButton
                                                size="small"
                                                onClick={() => updateQuantity(item, item.quantity + 1)}
                                                sx={{ color: TINT_FG }}
                                            >
                                                <AddRoundedIcon fontSize="small" />
                                            </IconButton>

                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                                            <Typography fontWeight={700}>
                                                {formatCurrency(item.totalPrice)}
                                            </Typography>

                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => removeItem(item)}
                                            >
                                                <DeleteOutlineRoundedIcon fontSize="small" />
                                            </IconButton>

                                        </Box>

                                    </Box>

                                </Box>

                            ))}

                        </Stack>

                    </Box>

                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

                    <Typography fontWeight={700}>Subtotal</Typography>
                    <Typography fontWeight={700}>{formatCurrency(subtotal)}</Typography>

                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    disabled={items.length === 0}
                    onClick={goToCheckout}
                >
                    Checkout
                </Button>

            </Box>

        </Drawer>

    );

}

export default CartDrawer;
