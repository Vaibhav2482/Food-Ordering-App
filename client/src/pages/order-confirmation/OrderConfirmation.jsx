import { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Container, Divider, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrderById } from "../../services/orderService";
import { formatCurrency } from "../../utils/formatCurrency";

function OrderConfirmation() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            try {

                setLoading(true);

                const response = await getOrderById(orderId);

                if (response.success) {
                    setOrder(response.data[0]);
                }

            } catch {

                toast.error("Failed to load order details.");

            } finally {

                setLoading(false);

            }

        })();

    }, [orderId]);

    if (loading) {

        return (

            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress color="warning" />
            </Box>

        );

    }

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 }, textAlign: "center" }}>

            <CheckCircleRoundedIcon sx={{ fontSize: { xs: 56, md: 72 }, color: "#22C55E" }} />

            <Typography variant="h4" sx={{ mt: 2 }}>
                Order Placed!
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
                Thank you for ordering with ChaiChakhna. Your chai is on its way.
            </Typography>

            {order && (

                <Card sx={{ p: 3, mt: 4, textAlign: "left" }}>

                    <Typography fontWeight={700}>Order #{order.OrderId}</Typography>

                    <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                        Status: {order.OrderStatus}
                    </Typography>

                    {order.BranchName && (
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            Branch: {order.BranchName}
                        </Typography>
                    )}

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                        <Typography fontWeight={700}>Total Amount</Typography>
                        <Typography fontWeight={700}>{formatCurrency(order.TotalAmount)}</Typography>

                    </Box>

                </Card>

            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4, flexWrap: "wrap" }}>

                <Button variant="outlined" component={RouterLink} to="/menu">
                    Continue Shopping
                </Button>

                {order && (
                    <Button variant="outlined" component={RouterLink} to={`/orders/${order.OrderId}/bill`}>
                        View Bill
                    </Button>
                )}

                <Button variant="contained" component={RouterLink} to="/orders">
                    View My Orders
                </Button>

            </Box>

        </Container>

    );

}

export default OrderConfirmation;
