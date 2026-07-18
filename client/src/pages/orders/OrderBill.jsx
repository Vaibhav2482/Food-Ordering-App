import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    GlobalStyles,
    Stack,
    Typography
} from "@mui/material";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrderById } from "../../services/orderService";
import { getPaymentByOrderId } from "../../services/paymentService";
import { formatCurrency } from "../../utils/formatCurrency";

const printStyles = {
    "@media print": {
        header: { display: "none !important" },
        footer: { display: "none !important" },
        ".no-print": { display: "none !important" }
    }
};

function OrderBill() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            try {

                setLoading(true);

                const response = await getOrderById(id);

                if (response.success) {
                    setRows(response.data);
                } else {
                    toast.error(response.message);
                }

                try {

                    const paymentResponse = await getPaymentByOrderId(id);

                    if (paymentResponse.success) {
                        setPayment(paymentResponse.data[0]);
                    }

                } catch {

                    // No payment recorded yet — fine, bill still renders.

                }

            } catch {

                toast.error("Failed to load bill.");

            } finally {

                setLoading(false);

            }

        })();

    }, [id]);

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

    return (

        <>

            <GlobalStyles styles={printStyles} />

            <Container maxWidth="sm" sx={{ py: 4 }}>

                <Box className="no-print" sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>

                    <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)}>
                        Back
                    </Button>

                    <Button variant="contained" startIcon={<PrintRoundedIcon />} onClick={() => window.print()}>
                        Print Bill
                    </Button>

                </Box>

                <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 3, p: 4 }}>

                    <Box sx={{ textAlign: "center", mb: 3 }}>

                        <Typography variant="h5" fontWeight={800} sx={{ color: "#F58220" }}>
                            ChaiChakhna Company
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Fresh Chai &amp; Snacks
                        </Typography>

                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={0.5} sx={{ mb: 2 }}>

                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">Invoice #</Typography>
                            <Typography variant="body2" fontWeight={700}>{order.OrderId}</Typography>
                        </Stack>

                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">Date</Typography>
                            <Typography variant="body2">{new Date(order.OrderDate).toLocaleString()}</Typography>
                        </Stack>

                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">Billed To</Typography>
                            <Typography variant="body2">{order.CustomerName}</Typography>
                        </Stack>

                    </Stack>

                    <Divider sx={{ mb: 1 }} />

                    <Box sx={{ display: "flex", fontWeight: 700, fontSize: 13, mb: 1 }}>
                        <Box sx={{ flex: 1 }}>Item</Box>
                        <Box sx={{ width: 40, textAlign: "center" }}>Qty</Box>
                        <Box sx={{ width: 70, textAlign: "right" }}>Price</Box>
                        <Box sx={{ width: 80, textAlign: "right" }}>Total</Box>
                    </Box>

                    <Divider sx={{ mb: 1 }} />

                    {rows.map((row) => (

                        <Box key={row.OrderItemId} sx={{ display: "flex", fontSize: 14, mb: 0.5 }}>
                            <Box sx={{ flex: 1 }}>{row.ItemName}</Box>
                            <Box sx={{ width: 40, textAlign: "center" }}>{row.Quantity}</Box>
                            <Box sx={{ width: 70, textAlign: "right" }}>{formatCurrency(row.Price)}</Box>
                            <Box sx={{ width: 80, textAlign: "right" }}>{formatCurrency(row.TotalPrice)}</Box>
                        </Box>

                    ))}

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={0.5}>

                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                            <Typography variant="body2">{formatCurrency(order.SubTotal)}</Typography>
                        </Stack>

                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">CGST (2.5%)</Typography>
                            <Typography variant="body2">{formatCurrency(order.CgstAmount)}</Typography>
                        </Stack>

                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">SGST (2.5%)</Typography>
                            <Typography variant="body2">{formatCurrency(order.SgstAmount)}</Typography>
                        </Stack>

                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6">Grand Total</Typography>
                        <Typography variant="h6">{formatCurrency(order.TotalAmount)}</Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">Order Type</Typography>
                        <Typography variant="body2">{order.DeliveryType}</Typography>
                    </Stack>

                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                        <Typography variant="body2">{order.PaymentMethod}</Typography>
                    </Stack>

                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>

                        <Typography variant="body2" color="text.secondary">Payment Status</Typography>

                        <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{ color: payment?.PaymentStatus === "Success" ? "success.main" : "warning.main" }}
                        >
                            {payment?.PaymentStatus || "Pending"}
                        </Typography>

                    </Stack>

                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
                        Thank you for ordering with ChaiChakhna!
                    </Typography>

                </Box>

            </Container>

        </>

    );

}

export default OrderBill;
