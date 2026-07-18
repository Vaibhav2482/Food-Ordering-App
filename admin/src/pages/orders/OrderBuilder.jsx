import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import toast from "react-hot-toast";

import { getAllMenu } from "../../services/menuService";
import { getAllCategories } from "../../services/categoryService";
import { findOrCreateWalkInCustomer, getOrCreateGuestCustomer } from "../../services/customerService";
import { createOrder } from "../../services/orderService";
import { createPayment } from "../../services/paymentService";
import AdminMenuItemRow from "./AdminMenuItemRow";

const PAYMENT_METHODS = ["Cash", "UPI", "Card"];
const GUEST_PHONE = "0000000000";

function OrderBuilder({ branchId, deliveryType, tableNumber, onCreated, onCancel }) {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [cartLines, setCartLines] = useState([]);
    const [itemSearch, setItemSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("all");

    const [customerPhone, setCustomerPhone] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [resolvedCustomer, setResolvedCustomer] = useState(null);
    const [needsName, setNeedsName] = useState(false);
    const [checkingCustomer, setCheckingCustomer] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);

    useEffect(() => {

        (async () => {

            try {

                const response = await getAllCategories();

                if (response.success) {
                    setCategories(response.data.filter((category) => category.IsActive));
                }

            } catch {

                toast.error("Failed to load categories.");

            }

        })();

        // Default to a walk-in guest so counter/kiosk staff don't have to click
        // anything before adding items - they can still swap to a real customer.
        (async () => {

            try {

                const response = await getOrCreateGuestCustomer();
                setResolvedCustomer(response.data);

            } catch {

                // Non-fatal - the customer step still offers a manual "Skip" option.

            }

        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (!branchId) {
            return;
        }

        (async () => {

            try {

                const response = await getAllMenu(branchId);

                if (response.success) {
                    setMenuItems(response.data.filter((item) => item.IsAvailable));
                }

            } catch {

                toast.error("Failed to load menu for this branch.");

            }

        })();

    }, [branchId]);

    const handleFindCustomer = async () => {

        if (!customerPhone.trim()) {
            toast.error("Enter a phone number.");
            return;
        }

        setCheckingCustomer(true);

        try {

            const response = await findOrCreateWalkInCustomer({
                phone: customerPhone.trim(),
                fullName: needsName ? customerName.trim() : undefined,
                email: needsName ? customerEmail.trim() : undefined
            });

            setResolvedCustomer(response.data);
            setNeedsName(false);

        } catch (error) {

            const message = error.response?.data?.message;

            if (message?.includes("Full Name is required")) {
                setNeedsName(true);
            } else {
                toast.error(message || "Failed to look up customer.");
            }

        } finally {

            setCheckingCustomer(false);

        }

    };

    const handleSkipCustomer = async () => {

        setCheckingCustomer(true);

        try {

            const response = await getOrCreateGuestCustomer();

            setResolvedCustomer(response.data);
            setNeedsName(false);

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to start a guest order.");

        } finally {

            setCheckingCustomer(false);

        }

    };

    const handleChangeCustomer = () => {

        setResolvedCustomer(null);
        setNeedsName(false);
        setCustomerPhone("");
        setCustomerName("");
        setCustomerEmail("");

    };

    const isGuest = resolvedCustomer?.Phone === GUEST_PHONE;

    const getQuantity = (menuItemId) =>
        cartLines.find((line) => line.menuItemId === menuItemId)?.quantity ?? 0;

    const handleIncrement = (menuItem) => {

        setCartLines((prev) => {

            const existing = prev.find((line) => line.menuItemId === menuItem.MenuItemId);

            if (existing) {
                return prev.map((line) =>
                    line.menuItemId === menuItem.MenuItemId
                        ? { ...line, quantity: line.quantity + 1 }
                        : line
                );
            }

            return [
                ...prev,
                {
                    menuItemId: menuItem.MenuItemId,
                    itemName: menuItem.ItemName,
                    price: Number(menuItem.Price),
                    quantity: 1
                }
            ];

        });

    };

    const handleDecrement = (menuItem) => {

        setCartLines((prev) => {

            const existing = prev.find((line) => line.menuItemId === menuItem.MenuItemId);

            if (!existing) {
                return prev;
            }

            if (existing.quantity <= 1) {
                return prev.filter((line) => line.menuItemId !== menuItem.MenuItemId);
            }

            return prev.map((line) =>
                line.menuItemId === menuItem.MenuItemId
                    ? { ...line, quantity: line.quantity - 1 }
                    : line
            );

        });

    };

    const handleRemoveLine = (menuItemId) => {
        setCartLines((prev) => prev.filter((line) => line.menuItemId !== menuItemId));
    };

    const categoriesWithItems = useMemo(() =>
        categories.filter((category) =>
            menuItems.some((item) => item.CategoryId === category.CategoryId)
        ),
    [categories, menuItems]);

    const sections = useMemo(() => {

        const search = itemSearch.trim().toLowerCase();

        return categories
            .filter((category) =>
                selectedCategoryId === "all" || category.CategoryId === selectedCategoryId
            )
            .map((category) => ({
                ...category,
                items: menuItems.filter((item) =>
                    item.CategoryId === category.CategoryId &&
                    item.ItemName.toLowerCase().includes(search)
                )
            }))
            .filter((category) => category.items.length > 0);

    }, [categories, menuItems, itemSearch, selectedCategoryId]);

    const subtotal = cartLines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const cgst = Math.round(subtotal * 0.025 * 100) / 100;
    const sgst = Math.round(subtotal * 0.025 * 100) / 100;
    const total = subtotal + cgst + sgst;

    const handleReview = () => {

        if (!resolvedCustomer) {
            toast.error("Find, add, or skip the customer first.");
            return;
        }

        if (cartLines.length === 0) {
            toast.error("Add at least one item.");
            return;
        }

        setReviewOpen(true);

    };

    const handleConfirm = async () => {

        try {

            setSubmitting(true);

            const response = await createOrder({
                customerId: resolvedCustomer.CustomerId,
                deliveryType,
                tableNumber: deliveryType === "Dine In" ? tableNumber : undefined,
                paymentMethod,
                notes: notes.trim() || undefined,
                items: cartLines.map((line) => ({
                    menuItemId: line.menuItemId,
                    quantity: line.quantity
                }))
            });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            try {

                await createPayment({
                    orderId: response.data.OrderId,
                    paymentMethod,
                    amount: response.data.TotalAmount,
                    paymentStatus: "Paid"
                });

            } catch {

                // Payment recording is best-effort; the order itself is already placed.

            }

            toast.success(`Order #${response.data.OrderId} created.`);
            setReviewOpen(false);
            onCreated(response.data);

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to create order.");

        } finally {

            setSubmitting(false);

        }

    };

    return (

        <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 7 }}>

                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                    Items
                </Typography>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search menu items..."
                    value={itemSearch}
                    onChange={(event) => setItemSearch(event.target.value)}
                    sx={{ mb: 2 }}
                />

                {categoriesWithItems.length > 0 && (

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 2,
                            maxHeight: 92,
                            overflowY: "auto"
                        }}
                    >

                        <Chip
                            label="All"
                            color={selectedCategoryId === "all" ? "primary" : "default"}
                            onClick={() => setSelectedCategoryId("all")}
                        />

                        {categoriesWithItems.map((category) => (

                            <Chip
                                key={category.CategoryId}
                                label={category.CategoryName}
                                color={selectedCategoryId === category.CategoryId ? "primary" : "default"}
                                onClick={() => setSelectedCategoryId(category.CategoryId)}
                            />

                        ))}

                    </Box>

                )}

                <Box sx={{ maxHeight: 560, overflowY: "auto", pr: 0.5 }}>

                    {sections.length === 0 ? (

                        <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
                            No menu items found.
                        </Typography>

                    ) : (

                        sections.map((section) => (

                            <Box key={section.CategoryId} sx={{ mb: 2 }}>

                                <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ mb: 0.5 }}>
                                    {section.CategoryName}
                                </Typography>

                                {section.items.map((item) => (

                                    <AdminMenuItemRow
                                        key={item.MenuItemId}
                                        item={item}
                                        quantity={getQuantity(item.MenuItemId)}
                                        onIncrement={handleIncrement}
                                        onDecrement={handleDecrement}
                                    />

                                ))}

                            </Box>

                        ))

                    )}

                </Box>

            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>

                <Box sx={{ position: { md: "sticky" }, top: { md: 16 } }}>

                    <Card variant="outlined" sx={{ p: 2.5 }}>

                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                            Customer
                        </Typography>

                        {resolvedCustomer ? (

                            <Chip
                                label={
                                    isGuest
                                        ? "Walk-in Guest (no details given)"
                                        : `${resolvedCustomer.FullName} — ${resolvedCustomer.Phone}`
                                }
                                color="success"
                                onDelete={handleChangeCustomer}
                                sx={{ mb: 1, maxWidth: "100%" }}
                            />

                        ) : (

                            <Grid container spacing={1.5}>

                                <Grid size={{ xs: 12 }}>

                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Phone Number"
                                        placeholder="Optional if guest doesn't want to share"
                                        value={customerPhone}
                                        onChange={(event) => setCustomerPhone(event.target.value)}
                                    />

                                </Grid>

                                {needsName && (

                                    <>

                                        <Grid size={{ xs: 12 }}>

                                            <TextField
                                                fullWidth
                                                size="small"
                                                required
                                                label="Customer Name"
                                                value={customerName}
                                                onChange={(event) => setCustomerName(event.target.value)}
                                            />

                                        </Grid>

                                        <Grid size={{ xs: 12 }}>

                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Email (optional)"
                                                value={customerEmail}
                                                onChange={(event) => setCustomerEmail(event.target.value)}
                                            />

                                        </Grid>

                                        <Grid size={{ xs: 12 }}>

                                            <Typography variant="body2" color="text.secondary">
                                                No existing customer with this phone number — enter their name to create one.
                                            </Typography>

                                        </Grid>

                                    </>

                                )}

                                <Grid size={{ xs: needsName ? 12 : 8 }}>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        disabled={checkingCustomer}
                                        onClick={handleFindCustomer}
                                    >
                                        {needsName ? "Create Customer & Continue" : "Find / Add Customer"}
                                    </Button>

                                </Grid>

                                {!needsName && (

                                    <Grid size={{ xs: 4 }}>

                                        <Button
                                            variant="text"
                                            fullWidth
                                            disabled={checkingCustomer}
                                            onClick={handleSkipCustomer}
                                        >
                                            Skip
                                        </Button>

                                    </Grid>

                                )}

                            </Grid>

                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                            Cart
                        </Typography>

                        {cartLines.length === 0 ? (

                            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                                No items added yet.
                            </Typography>

                        ) : (

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, maxHeight: 220, overflowY: "auto" }}>

                                {cartLines.map((line) => (

                                    <Box
                                        key={line.menuItemId}
                                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    >

                                        <Typography variant="body2" sx={{ minWidth: 0 }} noWrap>
                                            {line.itemName} &times; {line.quantity}
                                        </Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>

                                            <Typography variant="body2" fontWeight={600}>
                                                ₹ {(line.price * line.quantity).toFixed(2)}
                                            </Typography>

                                            <IconButton size="small" color="error" onClick={() => handleRemoveLine(line.menuItemId)}>
                                                <DeleteRoundedIcon fontSize="small" />
                                            </IconButton>

                                        </Box>

                                    </Box>

                                ))}

                            </Box>

                        )}

                        {cartLines.length > 0 && (

                            <Box sx={{ mt: 1.5, textAlign: "right" }}>

                                <Typography variant="body2" color="text.secondary">Subtotal: ₹ {subtotal.toFixed(2)}</Typography>
                                <Typography variant="body2" color="text.secondary">CGST (2.5%): ₹ {cgst.toFixed(2)}</Typography>
                                <Typography variant="body2" color="text.secondary">SGST (2.5%): ₹ {sgst.toFixed(2)}</Typography>
                                <Typography variant="h6" fontWeight={700}>Total: ₹ {total.toFixed(2)}</Typography>

                            </Box>

                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                            Payment Method
                        </Typography>

                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            color="primary"
                            size="small"
                            value={paymentMethod}
                            onChange={(event, value) => value && setPaymentMethod(value)}
                            sx={{ mb: 2 }}
                        >

                            {PAYMENT_METHODS.map((method) => (
                                <ToggleButton key={method} value={method}>
                                    {method}
                                </ToggleButton>
                            ))}

                        </ToggleButtonGroup>

                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                            label="Order Notes (optional)"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>

                            {onCancel && (
                                <Button onClick={onCancel}>
                                    Cancel
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                fullWidth={!onCancel}
                                disabled={submitting}
                                onClick={handleReview}
                            >
                                Review Order
                            </Button>

                        </Box>

                    </Card>

                </Box>

            </Grid>

            <Dialog open={reviewOpen} onClose={() => setReviewOpen(false)} fullWidth maxWidth="xs">

                <DialogTitle>
                    Confirm Order
                </DialogTitle>

                <DialogContent>

                    <Typography sx={{ mb: 1.5 }}>
                        <strong>Customer:</strong>{" "}
                        {isGuest ? "Walk-in Guest (no details given)" : `${resolvedCustomer?.FullName} — ${resolvedCustomer?.Phone}`}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }}>
                        <strong>Order Type:</strong>{" "}
                        {deliveryType}
                        {deliveryType === "Dine In" && tableNumber && ` (Table ${tableNumber})`}
                    </Typography>

                    <Divider sx={{ mb: 1.5 }} />

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 1.5 }}>

                        {cartLines.map((line) => (

                            <Box key={line.menuItemId} sx={{ display: "flex", justifyContent: "space-between" }}>

                                <Typography variant="body2">
                                    {line.itemName} &times; {line.quantity}
                                </Typography>

                                <Typography variant="body2" fontWeight={600}>
                                    ₹ {(line.price * line.quantity).toFixed(2)}
                                </Typography>

                            </Box>

                        ))}

                    </Box>

                    <Divider sx={{ mb: 1.5 }} />

                    <Typography sx={{ mb: 0.5 }}>
                        <strong>Payment:</strong> {paymentMethod}
                    </Typography>

                    <Typography variant="h6" fontWeight={700}>
                        Total: ₹ {total.toFixed(2)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                        Double-check the customer, items and total above — once placed,
                        items can only be changed while the order is still Pending.
                    </Typography>

                </DialogContent>

                <DialogActions>

                    <Button onClick={() => setReviewOpen(false)} disabled={submitting}>
                        Edit
                    </Button>

                    <Button variant="contained" disabled={submitting} onClick={handleConfirm}>
                        {submitting ? "Placing Order..." : "Confirm & Place Order"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Grid>

    );

}

export default OrderBuilder;
