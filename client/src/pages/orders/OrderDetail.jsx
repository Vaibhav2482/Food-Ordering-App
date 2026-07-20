import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    Divider,
    Step,
    StepLabel,
    Stepper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { cancelOrder, getOrderById } from "../../services/orderService";
import { getPaymentByOrderId } from "../../services/paymentService";
import { formatCurrency } from "../../utils/formatCurrency";
import { getStatusSteps, STATUS_DESCRIPTION, PAYMENT_TINT, isCancellable } from "../../utils/orderStatus";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";

function OrderDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {

        loadOrder();

        // Silently poll so the status stepper advances live as the
        // restaurant updates the order.
        const interval = setInterval(() => {

            if (document.visibilityState === "visible") {
                loadOrder(true);
            }

        }, 15000);

        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const loadOrder = async (silent = false) => {

        try {

            if (!silent) {
                setLoading(true);
            }

            const response = await getOrderById(id);

            if (response.success) {
                setRows(response.data);
            } else if (!silent) {
                toast.error(response.message);
            }

            try {

                const paymentResponse = await getPaymentByOrderId(id);

                if (paymentResponse.success && paymentResponse.data?.length > 0) {
                    setPayment(paymentResponse.data[0]);
                }

            } catch {

                // No payment recorded yet (e.g. cash orders) — fine, card just won't show.

            }

        } catch {

            if (!silent) {
                toast.error("Failed to load order.");
            }

        } finally {

            if (!silent) {
                setLoading(false);
            }

        }

    };

    const handleCancel = async () => {

        try {

            setCancelling(true);

            const response = await cancelOrder(id);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success("Order cancelled.");
            await loadOrder();

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to cancel order.");

        } finally {

            setCancelling(false);

        }

    };

    if (loading) {

        return (

            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress color="warning" />
            </Box>

        );

    }

    if (rows.length === 0) {

        return (

            <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>

                <Typography>Order not found.</Typography>

                <Button sx={{ mt: 2 }} onClick={() => navigate("/orders")}>
                    Back to Orders
                </Button>

            </Container>

        );

    }

    const order = rows[0];
    const isCancelled = order.OrderStatus === "Cancelled";
    const isDelivered = order.OrderStatus === "Delivered";
    const statusSteps = getStatusSteps(order.DeliveryType);
    const activeStep = statusSteps.indexOf(order.OrderStatus);
    const paymentTint = payment ? PAYMENT_TINT[payment.PaymentStatus] || PAYMENT_TINT.Pending : null;

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Order #{order.OrderId}
            </Typography>

            {/* Hero + stepper live in one card now — two stacked cards with
                their own borders/shadows read as visual clutter for what is
                really one continuous "here's where your order stands" idea. */}
            <Card sx={{ p: { xs: 2, sm: 2.5 }, mb: 2 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                    <OrderStatusBadge status={order.OrderStatus} size="large" />

                    <Typography variant="body2" color="text.secondary">
                        {STATUS_DESCRIPTION[order.OrderStatus]}
                    </Typography>

                </Box>

                {!isCancelled && !isDelivered && (

                    <>

                        <Divider sx={{ my: 2 }} />

                        {/* Vertical on phones — the horizontal stepper overflows
                            and clips labels on narrow screens. */}
                        <Box sx={{ display: { xs: "block", sm: "none" } }}>

                            <Stepper
                                activeStep={activeStep}
                                orientation="vertical"
                                sx={{
                                    "& .MuiStepLabel-label": { fontSize: 14 },
                                    "& .MuiStep-root": { minHeight: 0 },
                                    "& .MuiStepConnector-line": { minHeight: 16 }
                                }}
                            >

                                {statusSteps.map((step) => (
                                    <Step key={step}>
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                ))}

                            </Stepper>

                        </Box>

                        <Box sx={{ display: { xs: "none", sm: "block" } }}>

                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                sx={{ "& .MuiStepLabel-label": { fontSize: 12 } }}
                            >

                                {statusSteps.map((step) => (
                                    <Step key={step}>
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                ))}

                            </Stepper>

                        </Box>

                    </>

                )}

            </Card>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 1, px: 0.5 }}>

                <Typography fontWeight={700}>Detailed Bill</Typography>

                <Typography variant="body2" color="text.secondary">
                    {new Date(order.OrderDate).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    })}
                </Typography>

            </Box>

            <Card sx={{ p: { xs: 2, sm: 2.5 }, mb: 2 }}>

                <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>

                    <Box sx={{ width: 3, borderRadius: 1, bgcolor: "#F58220" }} />

                    <Box>

                        <Typography variant="body2" color="text.secondary">
                            Order ID: <Typography component="span" fontWeight={600} color="text.primary">#{order.OrderId}</Typography>
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Order Type: <Typography component="span" fontWeight={600} color="text.primary">
                                {order.DeliveryType}{order.TableNumber ? ` (Table ${order.TableNumber})` : ""}
                            </Typography>
                        </Typography>

                    </Box>

                </Box>

                {order.BranchName && (

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>

                        <StoreRoundedIcon fontSize="small" sx={{ color: "#F58220" }} />

                        <Typography fontWeight={700}>{order.BranchName}</Typography>

                    </Box>

                )}

                <Box sx={{ display: "flex", fontWeight: 700, fontSize: 13, color: "text.secondary", mb: 1 }}>
                    <Box sx={{ flex: 1 }}>Item</Box>
                    <Box sx={{ width: 40, textAlign: "center" }}>Qty</Box>
                    <Box sx={{ width: 80, textAlign: "right" }}>Price</Box>
                </Box>

                <Divider sx={{ mb: 1 }} />

                <Stack spacing={1}>

                    {rows.map((row) => (

                        <Box key={row.OrderItemId} sx={{ display: "flex", fontSize: 14 }}>
                            <Box sx={{ flex: 1 }}>{row.ItemName}</Box>
                            <Box sx={{ width: 40, textAlign: "center" }}>x{row.Quantity}</Box>
                            <Box sx={{ width: 80, textAlign: "right", fontWeight: 600 }}>
                                {formatCurrency(row.TotalPrice)}
                            </Box>
                        </Box>

                    ))}

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Item Total</Typography>
                    <Typography variant="body2">{formatCurrency(order.SubTotal ?? order.TotalAmount)}</Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <Typography fontWeight={700} sx={{ color: "#F58220" }}>Total Bill</Typography>

                    <Typography fontWeight={700} sx={{ color: "#F58220" }}>
                        {formatCurrency(order.TotalAmount)}
                    </Typography>

                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>

                    <Typography variant="caption" color="text.secondary">
                        Inclusive of taxes &amp; charges
                    </Typography>

                    {(order.CgstAmount || order.SgstAmount) && (

                        <Tooltip title={`CGST @2.5%: ${formatCurrency(order.CgstAmount)} · SGST @2.5%: ${formatCurrency(order.SgstAmount)}`}>
                            <InfoOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                        </Tooltip>

                    )}

                </Box>

                {order.OrderNotes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Notes: {order.OrderNotes}
                    </Typography>
                )}

            </Card>

            {payment && (

                <Card sx={{ p: { xs: 2, sm: 2.5 }, mb: 2 }}>

                    <Typography fontWeight={700} sx={{ mb: 1.5 }}>Payment Info</Typography>

                    <Box sx={{ display: "flex", gap: 1.5 }}>

                        <Box sx={{ width: 3, borderRadius: 1, bgcolor: "#F58220" }} />

                        <Box sx={{ flex: 1 }}>

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                                <Box>

                                    <Typography variant="body2">
                                        Paid Amount: <Typography component="span" fontWeight={700} color="#F58220">
                                            {formatCurrency(payment.Amount)}
                                        </Typography>
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        By: {payment.PaymentMethod}
                                    </Typography>

                                </Box>

                                <Box
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 2,
                                        bgcolor: paymentTint.bg,
                                        color: paymentTint.fg,
                                        fontWeight: 700,
                                        fontSize: 13
                                    }}
                                >
                                    {payment.PaymentStatus}
                                </Box>

                            </Box>

                        </Box>

                    </Box>

                </Card>

            )}

            <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(`/orders/${order.OrderId}/bill`)}
            >
                View Printable Bill
            </Button>

            {isCancellable(order.OrderStatus) && (

                <Button
                    fullWidth
                    color="error"
                    variant="outlined"
                    sx={{ mt: 1.5 }}
                    disabled={cancelling}
                    onClick={handleCancel}
                >
                    {cancelling ? "Cancelling..." : "Cancel Order"}
                </Button>

            )}

        </Container>

    );

}

export default OrderDetail;
