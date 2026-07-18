import { useEffect, useState } from "react";
import {
    Alert,
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
    Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { cancelOrder, getOrderById } from "../../services/orderService";
import { formatCurrency } from "../../utils/formatCurrency";
import { getStatusSteps, STATUS_DESCRIPTION, isCancellable } from "../../utils/orderStatus";

function OrderDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {

        loadOrder();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const loadOrder = async () => {

        try {

            setLoading(true);

            const response = await getOrderById(id);

            if (response.success) {
                setRows(response.data);
            } else {
                toast.error(response.message);
            }

        } catch {

            toast.error("Failed to load order.");

        } finally {

            setLoading(false);

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
    const statusSteps = getStatusSteps(order.DeliveryType);
    const activeStep = statusSteps.indexOf(order.OrderStatus);

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Order #{order.OrderId}
            </Typography>

            <Card sx={{ p: { xs: 2, md: 3 } }}>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(order.OrderDate).toLocaleString()}
                </Typography>

                {isCancelled ? (

                    <Alert severity="error" sx={{ mb: 3 }}>
                        {STATUS_DESCRIPTION.Cancelled}
                    </Alert>

                ) : (

                    <>

                        <Box sx={{ overflowX: "auto", mb: 2 }}>

                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                sx={{ minWidth: 480, "& .MuiStepLabel-label": { fontSize: 12 } }}
                            >

                                {statusSteps.map((step) => (
                                    <Step key={step}>
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                ))}

                            </Stepper>

                        </Box>

                        <Alert severity="info" sx={{ mb: 3 }}>
                            {STATUS_DESCRIPTION[order.OrderStatus]}
                        </Alert>

                    </>

                )}

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1.5} divider={<Divider />}>

                    {rows.map((row) => (

                        <Box key={row.OrderItemId} sx={{ display: "flex", justifyContent: "space-between" }}>

                            <Typography variant="body2">
                                {row.ItemName} &times; {row.Quantity}
                            </Typography>

                            <Typography variant="body2" fontWeight={600}>
                                {formatCurrency(row.TotalPrice)}
                            </Typography>

                        </Box>

                    ))}

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>

                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>{formatCurrency(order.TotalAmount)}</Typography>

                </Box>

                {order.BranchName && (
                    <Typography variant="body2" color="text.secondary">
                        Branch: {order.BranchName}
                    </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                    Order Type: {order.DeliveryType}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Payment: {order.PaymentMethod}
                </Typography>

                {order.OrderNotes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Notes: {order.OrderNotes}
                    </Typography>
                )}

                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3 }}
                    onClick={() => navigate(`/orders/${order.OrderId}/bill`)}
                >
                    View Bill
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

            </Card>

        </Container>

    );

}

export default OrderDetail;
