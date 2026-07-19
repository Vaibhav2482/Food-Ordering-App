import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Card,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useBranch } from "../../context/BranchContext";
import * as addressService from "../../services/addressService";
import { checkout } from "../../services/checkoutService";
import { confirmPayment } from "../../services/paymentService";
import { useRazorpayPayment, PAYMENT_CANCELLED } from "../../hooks/useRazorpayPayment";

import AddressSelector from "./AddressSelector";
import AddressDialog from "./AddressDialog";
import OrderSummary from "./OrderSummary";

// UPI first — online payment is the default.
const PAYMENT_METHODS = ["UPI", "Card", "Cash on Delivery"];
const ONLINE_PAYMENT_METHODS = ["UPI", "Card"];
// Dine In first — it's the default and the most common way customers order.
const DELIVERY_TYPES = ["Dine In", "Delivery"];

function Checkout() {

    const { customer } = useAuth();
    const { items, subtotal, clearCart, ready: cartReady } = useCart();
    const { selectedBranch } = useBranch();
    const navigate = useNavigate();
    const { payWithRazorpay } = useRazorpayPayment();

    const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES[0]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
    const [notes, setNotes] = useState("");
    const [addressDialogOpen, setAddressDialogOpen] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);

    const isDelivery = deliveryType === "Delivery";
    const orderPlacedRef = useRef(false);

    useEffect(() => {

        if (cartReady && items.length === 0 && !orderPlacedRef.current) {
            navigate("/cart", { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartReady, items.length]);

    useEffect(() => {

        loadAddresses();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAddresses = async () => {

        try {

            const response = await addressService.getAddresses(customer.CustomerId);

            if (response.success) {

                setAddresses(response.data);

                const defaultAddress = response.data.find((address) => address.IsDefault);

                if (defaultAddress) {
                    setSelectedAddressId(defaultAddress.AddressId);
                } else if (response.data.length > 0) {
                    setSelectedAddressId(response.data[0].AddressId);
                }

            }

        } catch {

            toast.error("Failed to load your saved addresses.");

        }

    };

    const handleSaveAddress = async (formData) => {

        try {

            const response = await addressService.createAddress({
                customerId: customer.CustomerId,
                ...formData
            });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success("Address saved.");
            setAddressDialogOpen(false);
            await loadAddresses();
            setSelectedAddressId(response.data.AddressId);

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to save address.");

        }

    };

    const handlePlaceOrder = async () => {

        if (isDelivery && !selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        try {

            setPlacingOrder(true);

            const checkoutResponse = await checkout({
                customerId: customer.CustomerId,
                addressId: isDelivery ? selectedAddressId : undefined,
                deliveryType,
                paymentMethod,
                notes
            });

            if (!checkoutResponse.success) {
                toast.error(checkoutResponse.message);
                return;
            }

            const order = checkoutResponse.data;

            orderPlacedRef.current = true;

            if (ONLINE_PAYMENT_METHODS.includes(paymentMethod)) {

                try {

                    await payWithRazorpay(order);

                } catch (error) {

                    await clearCart();

                    if (error.message === PAYMENT_CANCELLED) {
                        toast.error("Payment cancelled. You can complete payment from your order.");
                    } else {
                        toast.error(error.message || "Payment failed. You can retry from your order.");
                    }

                    navigate(`/orders/${order.OrderId}`, { replace: true });
                    return;

                }

            } else {

                try {

                    await confirmPayment({
                        orderId: order.OrderId,
                        paymentMethod,
                        amount: order.TotalAmount
                    });

                } catch {

                    // Payment recording is best-effort here; the order itself is already placed.

                }

            }

            await clearCart();

            toast.success("Order placed successfully!");
            navigate(`/order-confirmation/${order.OrderId}`, { replace: true });

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to place order.");

        } finally {

            setPlacingOrder(false);

        }

    };

    return (

        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Checkout
            </Typography>

            <Grid container spacing={{ xs: 2.5, md: 4 }}>

                <Grid size={{ xs: 12, md: 7 }}>

                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
                        Order Type
                    </Typography>

                    <ToggleButtonGroup
                        exclusive
                        fullWidth
                        color="primary"
                        value={deliveryType}
                        onChange={(event, value) => value && setDeliveryType(value)}
                        sx={{ mb: { xs: 2.5, md: 4 } }}
                    >

                        <ToggleButton value="Dine In">Dine In</ToggleButton>
                        <ToggleButton value="Delivery">Delivery</ToggleButton>

                    </ToggleButtonGroup>

                    {isDelivery ? (

                        <>

                            <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
                                Delivery Address
                            </Typography>

                            <AddressSelector
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelect={setSelectedAddressId}
                                onAddNew={() => setAddressDialogOpen(true)}
                            />

                        </>

                    ) : (

                        <Card sx={{ p: { xs: 2, md: 3 }, mb: 1, bgcolor: "#FFF8F0" }}>

                            <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                                Dining in with us today
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                No delivery address needed — just let our staff know your name
                                when your order is ready.
                            </Typography>

                        </Card>

                    )}

                    <Typography variant="h6" fontWeight={700} sx={{ mt: { xs: 2.5, md: 4 }, mb: 1.5 }}>
                        Payment Method
                    </Typography>

                    <Card sx={{ p: { xs: 2, md: 3 } }}>

                        <FormControl fullWidth sx={{ mb: 3 }}>

                            <InputLabel>Payment Method</InputLabel>

                            <Select
                                label="Payment Method"
                                value={paymentMethod}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            >

                                {PAYMENT_METHODS.map((method) => (
                                    <MenuItem key={method} value={method}>{method}</MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            minRows={1}
                            maxRows={3}
                            size="small"
                            label="Order Notes (optional)"
                            placeholder="e.g. less sugar, extra spicy"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />


                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>

                    <OrderSummary items={items} subtotal={subtotal} branchName={selectedBranch?.BranchName} />

                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={placingOrder || items.length === 0}
                        onClick={handlePlaceOrder}
                    >
                        {placingOrder ? "Placing Order..." : "Place Order"}
                    </Button>

                </Grid>

            </Grid>

            <AddressDialog
                open={addressDialogOpen}
                onClose={() => setAddressDialogOpen(false)}
                onSave={handleSaveAddress}
                isEditMode={false}
            />

            <Box sx={{ height: 16 }} />

        </Container>

    );

}

export default Checkout;
