import { useEffect, useState } from "react";
import { Box, Card, Chip, CircularProgress, Container, Typography } from "@mui/material";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { getOrdersByCustomer } from "../../services/orderService";
import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../../components/common/EmptyState";
import { STATUS_COLOR, STATUS_ICON } from "../../utils/orderStatus";

function OrderHistory() {

    const { customer } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            try {

                setLoading(true);

                const response = await getOrdersByCustomer(customer.CustomerId);

                if (response.success) {
                    setOrders(response.data);
                }

            } catch {

                toast.error("Failed to load your orders.");

            } finally {

                setLoading(false);

            }

        })();

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

                orders.map((order) => {

                    const StatusIcon = STATUS_ICON[order.OrderStatus];

                    return (

                    <Card
                        key={order.OrderId}
                        sx={{ p: 3, mb: 2, cursor: "pointer" }}
                        onClick={() => navigate(`/orders/${order.OrderId}`)}
                    >

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

                            <Box>

                                <Typography fontWeight={700}>Order #{order.OrderId}</Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {new Date(order.OrderDate).toLocaleString()}
                                </Typography>

                                {order.BranchName && (
                                    <Typography variant="body2" color="text.secondary">
                                        {order.BranchName}
                                    </Typography>
                                )}

                            </Box>

                            <Chip
                                label={order.OrderStatus}
                                color={STATUS_COLOR[order.OrderStatus] || "default"}
                                icon={StatusIcon ? <StatusIcon fontSize="small" /> : undefined}
                                size="small"
                            />

                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>

                            <Typography color="text.secondary">{order.PaymentMethod}</Typography>

                            <Typography fontWeight={700}>{formatCurrency(order.TotalAmount)}</Typography>

                        </Box>

                    </Card>

                    );
                })

            )}

        </Container>

    );

}

export default OrderHistory;
