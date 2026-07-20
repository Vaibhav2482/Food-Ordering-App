import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useBranch } from "../../context/BranchContext";
import { useBranchSwitch } from "../../hooks/useBranchSwitch";
import { getAllMenu } from "../../services/menuService";
import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../../components/common/EmptyState";
import SwitchBranchDialog from "../../components/common/SwitchBranchDialog";
import PopularItemCard from "../home/PopularItemCard";

const TINT_FG = "#F58220";

function Cart() {

    const { items, subtotal, updateQuantity, loading } = useCart();
    const { isAuthenticated } = useAuth();
    const { branches, selectedBranch, selectedBranchId } = useBranch();
    const { pendingBranchId, requestSwitch, confirmSwitch, cancelSwitch } = useBranchSwitch();
    const navigate = useNavigate();

    const [branchMenuAnchor, setBranchMenuAnchor] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {

        if (!selectedBranchId || items.length === 0) {
            return;
        }

        (async () => {

            try {

                const response = await getAllMenu(selectedBranchId);

                if (response.success) {

                    const cartItemIds = new Set(items.map((line) => line.menuItemId));

                    const candidates = response.data.filter((item) =>
                        item.IsAvailable && item.IsActive && !cartItemIds.has(item.MenuItemId)
                    );

                    const popularFirst = [...candidates].sort((a, b) => (b.IsPopular ? 1 : 0) - (a.IsPopular ? 1 : 0));

                    setSuggestions(popularFirst.slice(0, 4));

                }

            } catch {

                // Upsell strip is a nice-to-have — fail silently, cart still works.

            }

        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBranchId, items.length]);

    const handleCheckout = () => {

        if (!isAuthenticated) {
            navigate("/login", { state: { from: { pathname: "/checkout" } } });
            return;
        }

        navigate("/checkout");

    };

    const handleBranchSelect = (branchId) => {

        setBranchMenuAnchor(null);
        requestSwitch(branchId);

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

        <Container maxWidth="md" sx={{ py: { xs: 2.5, md: 4 }, pb: { xs: 12, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Your Cart
            </Typography>

            {selectedBranch && (

                <Card sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>

                        <LocationOnRoundedIcon sx={{ color: TINT_FG, flexShrink: 0 }} />

                        <Box sx={{ minWidth: 0 }}>

                            <Typography variant="caption" color="text.secondary">
                                Ordering from
                            </Typography>

                            <Typography fontWeight={700} noWrap>
                                {selectedBranch.BranchName}
                            </Typography>

                        </Box>

                    </Box>

                    <Button
                        size="small"
                        sx={{ bgcolor: "#FFE8D1", color: TINT_FG, fontWeight: 700, flexShrink: 0 }}
                        onClick={(event) => setBranchMenuAnchor(event.currentTarget)}
                    >
                        Change
                    </Button>

                    <Menu
                        anchorEl={branchMenuAnchor}
                        open={Boolean(branchMenuAnchor)}
                        onClose={() => setBranchMenuAnchor(null)}
                    >

                        {branches.map((branch) => (

                            <MenuItem
                                key={branch.BranchId}
                                selected={branch.BranchId === selectedBranch.BranchId}
                                onClick={() => handleBranchSelect(branch.BranchId)}
                            >
                                {branch.BranchName}
                            </MenuItem>

                        ))}

                    </Menu>

                </Card>

            )}

            <Card sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>

                {items.map((item, index) => (

                    <Box key={item.key}>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "flex-start", sm: "center" },
                                justifyContent: "space-between",
                                gap: { xs: 1.5, sm: 2 },
                                py: 1.5
                            }}
                        >

                            <Box sx={{ flex: 1, minWidth: 0 }}>

                                <Typography fontWeight={700}>{item.itemName}</Typography>

                                <Typography sx={{ mt: 0.25, fontWeight: 700, color: TINT_FG }}>
                                    {formatCurrency(item.price)}
                                </Typography>

                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    bgcolor: "#FFE8D1",
                                    borderRadius: 5,
                                    px: 0.5
                                }}
                            >

                                <IconButton size="small" onClick={() => updateQuantity(item, item.quantity - 1)} sx={{ color: TINT_FG }}>
                                    <RemoveRoundedIcon fontSize="small" />
                                </IconButton>

                                <Typography fontWeight={700} color={TINT_FG} sx={{ minWidth: 20, textAlign: "center" }}>
                                    {item.quantity}
                                </Typography>

                                <IconButton size="small" onClick={() => updateQuantity(item, item.quantity + 1)} sx={{ color: TINT_FG }}>
                                    <AddRoundedIcon fontSize="small" />
                                </IconButton>

                            </Box>

                        </Box>

                        {index !== items.length - 1 && <Divider />}

                    </Box>

                ))}

            </Card>

            {suggestions.length > 0 && (

                <Box sx={{ mb: 2 }}>

                    <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                        Complete your meal with:
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto", pb: 0.5, "&::-webkit-scrollbar": { display: "none" } }}>

                        {suggestions.map((item) => (
                            <PopularItemCard key={item.MenuItemId} item={item} />
                        ))}

                    </Box>

                </Box>

            )}

            <Card sx={{ p: { xs: 2, sm: 2.5 }, mb: 2 }}>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <Typography fontWeight={700}>
                        Subtotal: <Box component="span" sx={{ color: TINT_FG }}>{formatCurrency(subtotal)}</Box>
                    </Typography>

                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>

                    <InfoOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />

                    <Typography variant="caption" color="text.secondary">
                        GST (5%) is added at checkout
                    </Typography>

                </Box>

            </Card>

            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                    position: "fixed",
                    bottom: 64,
                    left: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    px: 2,
                    py: 1.5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 10
                }}
            >

                <Typography fontWeight={800} fontSize={18}>
                    {formatCurrency(subtotal)}
                </Typography>

                <Button variant="contained" onClick={handleCheckout}>
                    Proceed to Checkout
                </Button>

            </Box>

            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleCheckout}
                sx={{ display: { xs: "none", md: "flex" } }}
            >
                Proceed to Checkout
            </Button>

            <SwitchBranchDialog
                open={Boolean(pendingBranchId)}
                onCancel={cancelSwitch}
                onConfirm={confirmSwitch}
            />

        </Container>

    );

}

export default Cart;
