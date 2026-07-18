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

import { getOrderById } from "../../services/orderService";
import { getPaymentByOrderId } from "../../services/paymentService";
import BillContent from "./BillContent";

const printStyles = {
    "@media print": {
        header: { display: "none !important" },
        footer: { display: "none !important" },
        nav: { display: "none !important" },
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

                if (response.success !== false) {
                    setRows(Array.isArray(response.data) ? response.data : []);
                }

                try {

                    const paymentResponse = await getPaymentByOrderId(id);

                    if (paymentResponse.data?.length > 0) {
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

    return (

        <>

            <GlobalStyles styles={printStyles} />

            <Container maxWidth="sm" sx={{ py: 4 }}>

                <Box className="no-print" sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>

                    <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate("/orders")}>
                        Back
                    </Button>

                    <Button variant="contained" startIcon={<PrintRoundedIcon />} onClick={() => window.print()}>
                        Print Bill
                    </Button>

                </Box>

                <BillContent order={rows} payment={payment} />

            </Container>

        </>

    );

}

export default OrderBill;
