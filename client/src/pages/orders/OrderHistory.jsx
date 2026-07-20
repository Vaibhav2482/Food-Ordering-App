import { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Container, Divider, Typography } from "@mui/material";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { getOrdersByCustomer } from "../../services/orderService";
import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../../components/common/EmptyState";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";

function OrderHistory() {

    const { customer } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const load = async (silent = false) => {

            try {

                if (!silent) {
                    setLoading(true);
                }

                const response = await getOrdersByCustomer(customer.CustomerId);

                if (response.success) {
                    setOrders(response.data);
                }

            } catch {

                if (!silent) {
                    toast.error("Failed to load your orders.");
                }

            } finally {

                if (!silent) {
                    setLoading(false);
                }

            }

        };

        load();

        // Silently poll so status changes made by the restaurant show up
        // without the customer refreshing the page.
        const interval = setInterval(() => {

            if (document.visibilityState === "visible") {
                load(true);
            }

        }, 15000);

        return () => clearInterval(interval);

    }, [customer.CustomerId]);

    if (loading) {

        return (

            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress color="warning" />
            </Box>

        );

    }

    return (

        <Container maxWidth="md" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                My Orders
            </Typography>

            {orders.length === 0 ? (

                <EmptyState
                    icon={<ReceiptLongRoundedIcon sx={{ fontSize: 56, color: "text.secondary" }} />}
                    title="No orders yet"
                    subtitle="When you place an order, it will show up here."
                    actionLabel="Browse Menu"
                    onAction={() => navigate("/menu")}
                />

            ) : (

                orders.map((order) => (

                    <Card key={order.OrderId} sx={{ p: { xs: 2, sm: 2.5 }, mb: 2 }}>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>

                            <Box sx={{ minWidth: 0 }}>

                                <Typography fontWeight={700} sx={{ fontSize: 17 }}>
                                    {order.BranchName || `Order #${order.OrderId}`}
                                </Typography>

                                <Box sx={{ mt: 0.5 }}>

                                    {(order.Items || []).map((item, index) => (

                                        <Typography key={index} variant="body2" color="text.secondary">
                                            {item.ItemName} (x{item.Quantity})
                                        </Typography>

                                    ))}

                                </Box>

                            </Box>

                            <OrderStatusBadge status={order.OrderStatus} />

                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mt: 1.5,
                                cursor: "pointer",
                                width: "fit-content"
                            }}
                            onClick={() => navigate(`/orders/${order.OrderId}`)}
                        >

                            <Typography fontWeight={700} sx={{ color: "#F58220" }}>
                                {formatCurrency(order.TotalAmount)}
                            </Typography>

                            <ChevronRightRoundedIcon fontSize="small" sx={{ color: "#F58220" }} />

                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>

                            <Box>

                                {order.TableNumber && (
                                    <Typography variant="body2" color="text.secondary">
                                        Table {order.TableNumber}
                                    </Typography>
                                )}

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

                            <Button
                                size="small"
                                variant="text"
                                sx={{ fontWeight: 700 }}
                                onClick={() => navigate(`/orders/${order.OrderId}`)}
                            >
                                View Bill
                            </Button>

                        </Box>

                    </Card>

                ))

            )}

        </Container>

    );

}

export default OrderHistory;
