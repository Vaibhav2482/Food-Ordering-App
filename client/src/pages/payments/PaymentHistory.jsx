import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getPaymentsByCustomer } from "../../services/paymentService";
import { formatCurrency } from "../../utils/formatCurrency";
import { PAYMENT_TINT } from "../../utils/orderStatus";
import EmptyState from "../../components/common/EmptyState";

const STATUS_ICON = {
    Success: CheckCircleRoundedIcon,
    Failed: CancelRoundedIcon,
    Pending: HourglassEmptyRoundedIcon
};

function PaymentHistory() {

    const { customer } = useAuth();
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [methodFilter, setMethodFilter] = useState("all");

    useEffect(() => {

        (async () => {

            try {

                setLoading(true);

                const response = await getPaymentsByCustomer(customer.CustomerId);

                if (response.success) {
                    setPayments(response.data);
                }

            } catch {

                toast.error("Failed to load payment history.");

            } finally {

                setLoading(false);

            }

        })();

    }, [customer.CustomerId]);

    const methods = useMemo(
        () => [...new Set(payments.map((payment) => payment.PaymentMethod))],
        [payments]
    );

    const filteredPayments = methodFilter === "all"
        ? payments
        : payments.filter((payment) => payment.PaymentMethod === methodFilter);

    if (loading) {

        return (

            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress color="warning" />
            </Box>

        );

    }

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Payment History
            </Typography>

            {payments.length === 0 ? (

                <EmptyState
                    icon={<ReceiptLongRoundedIcon sx={{ fontSize: 56, color: "text.secondary" }} />}
                    title="No payments yet"
                    subtitle="Payments you make for orders will show up here."
                />

            ) : (

                <>

                    <FormControl fullWidth sx={{ mb: 2 }}>

                        <Select
                            value={methodFilter}
                            onChange={(event) => setMethodFilter(event.target.value)}
                            displayEmpty
                            renderValue={(value) => (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Payment Method
                                    </Typography>
                                    <Typography fontWeight={700}>
                                        {value === "all" ? "All" : value}
                                    </Typography>
                                </Box>
                            )}
                        >

                            <MenuItem value="all">All</MenuItem>

                            {methods.map((method) => (
                                <MenuItem key={method} value={method}>{method}</MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                    {filteredPayments.map((payment) => {

                        const tint = PAYMENT_TINT[payment.PaymentStatus] || PAYMENT_TINT.Pending;
                        const StatusIcon = STATUS_ICON[payment.PaymentStatus] || HourglassEmptyRoundedIcon;

                        return (

                            <Card
                                key={payment.PaymentId}
                                sx={{ p: 2.5, mb: 2, cursor: "pointer" }}
                                onClick={() => navigate(`/orders/${payment.OrderId}`)}
                            >

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

                                    <Box>

                                        <Typography fontWeight={700}>{payment.PaymentMethod}</Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                            Order ID: {payment.OrderId}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            Transaction Amount: {formatCurrency(payment.Amount)}
                                        </Typography>

                                    </Box>

                                    <Box sx={{ textAlign: "center" }}>

                                        <StatusIcon sx={{ color: tint.fg, fontSize: 28 }} />

                                        <Typography variant="body2" fontWeight={700} sx={{ color: tint.fg }}>
                                            {payment.PaymentStatus}
                                        </Typography>

                                    </Box>

                                </Box>

                                <Divider sx={{ my: 1.5, borderStyle: "dashed" }} />

                                <Typography variant="body2">
                                    Taken for Order
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {new Date(payment.PaymentDate).toLocaleString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "2-digit",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                    {payment.BranchName ? ` · ${payment.BranchName}` : ""}
                                </Typography>

                            </Card>

                        );

                    })}

                </>

            )}

        </Container>

    );

}

export default PaymentHistory;
