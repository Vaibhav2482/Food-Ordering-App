import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    GlobalStyles,
    Typography
} from "@mui/material";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { createPortal } from "react-dom";

import { getOrderById } from "../../services/orderService";
import { getPaymentByOrderId } from "../../services/paymentService";
import ReceiptContent from "./ReceiptContent";

// Printing the app itself drags in the bottom nav and full-viewport layout
// (blank second page). Instead, hide the entire app when printing and show
// only a receipt copy rendered outside #root via a portal.
const printStyles = {
    "@media print": {
        "#root": { display: "none !important" },
        ".receipt-print-area": { display: "block !important" },
        "@page": { margin: "10mm" }
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

                <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 3, p: 3, width: "fit-content", mx: "auto" }}>

                    <ReceiptContent order={order} rows={rows} payment={payment} />

                </Box>

                {createPortal(

                    <Box className="receipt-print-area" sx={{ display: "none" }}>
                        <ReceiptContent order={order} rows={rows} payment={payment} />
                    </Box>,

                    document.body

                )}

            </Container>

        </>

    );

}

export default OrderBill;
