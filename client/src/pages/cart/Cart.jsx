import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../../components/common/EmptyState";

function Cart() {

    const { items, subtotal, updateQuantity, removeItem, loading } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {

        if (!isAuthenticated) {
            navigate("/login", { state: { from: { pathname: "/checkout" } } });
            return;
        }

        navigate("/checkout");

    };

    if (!loading && items.length === 0) {

        return (

            <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>

                <EmptyState
                    icon={<ShoppingCartRoundedIcon sx={{ fontSize: 56, color: "text.secondary" }} />}
                    title="Your cart is empty"
                    subtitle="Browse the menu and add something delicious."
                    actionLabel="Browse Menu"
                    onAction={() => navigate("/menu")}
                />

            </Container>

        );

    }

    return (

        <Container maxWidth="md" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Your Cart
            </Typography>

            <Card sx={{ p: { xs: 2, sm: 3 } }}>

                <Stack spacing={2} divider={<Divider />}>

                    {items.map((item) => (

                        <Box
                            key={item.key}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "flex-start", sm: "center" },
                                justifyContent: "space-between",
                                gap: { xs: 1.5, sm: 2 }
                            }}
                        >

                            <Box sx={{ flex: 1, minWidth: 0 }}>

                                <Typography fontWeight={600}>{item.itemName}</Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {formatCurrency(item.price)} each
                                </Typography>

                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    width: { xs: "100%", sm: "auto" },
                                    justifyContent: { xs: "space-between", sm: "flex-end" }
                                }}
                            >

                                <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: 2 }}>

                                    <IconButton size="small" onClick={() => updateQuantity(item, item.quantity - 1)}>
                                        <RemoveRoundedIcon fontSize="small" />
                                    </IconButton>

                                    <Typography sx={{ px: 1, minWidth: 24, textAlign: "center" }}>
                                        {item.quantity}
                                    </Typography>

                                    <IconButton size="small" onClick={() => updateQuantity(item, item.quantity + 1)}>
                                        <AddRoundedIcon fontSize="small" />
                                    </IconButton>

                                </Box>

                                <Typography fontWeight={700} sx={{ minWidth: 90, textAlign: "right" }}>
                                    {formatCurrency(item.totalPrice)}
                                </Typography>

                                <IconButton color="error" onClick={() => removeItem(item)}>
                                    <DeleteOutlineRoundedIcon />
                                </IconButton>

                            </Box>

                        </Box>

                    ))}

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>

                    <Typography variant="h6">Subtotal</Typography>
                    <Typography variant="h6">{formatCurrency(subtotal)}</Typography>

                </Box>

                <Button fullWidth size="large" variant="contained" onClick={handleCheckout}>
                    Proceed to Checkout
                </Button>

            </Card>

        </Container>

    );

}

export default Cart;
