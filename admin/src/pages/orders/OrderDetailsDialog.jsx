import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    GlobalStyles,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { getStatusSteps, isTerminal } from "../../utils/orderStatus";
import { getPaymentByOrderId } from "../../services/paymentService";
import QuickStatusControl from "./QuickStatusControl";
import EditOrderItemsDialog from "./EditOrderItemsDialog";
import BillContent from "./BillContent";

const printStyles = {
    "@media print": {
        "body *": { visibility: "hidden" },
        ".order-print-area, .order-print-area *": { visibility: "visible" },
        ".order-print-area": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%"
        }
    }
};

function OrderDetailsDialog({

    open,
    onClose,
    order,
    onStatusChange,
    onCancel,
    onItemsUpdated

}) {

    const [editItemsOpen, setEditItemsOpen] = useState(false);
    const [payment, setPayment] = useState(null);

    const orderId = order?.[0]?.OrderId;

    useEffect(() => {

        if (!open || !orderId) {
            return;
        }

        setPayment(null);

        (async () => {

            try {

                const response = await getPaymentByOrderId(orderId);

                if (response.data?.length > 0) {
                    setPayment(response.data[0]);
                }

            } catch {

                // No payment recorded yet — bill still prints fine without it.

            }

        })();

    }, [open, orderId]);

    if (!order || order.length === 0) {

        return null;

    }

    const orderInfo = order[0];
    const currentStatus = orderInfo.OrderStatus;
    const isCancelled = currentStatus === "Cancelled";
    const statusSteps = getStatusSteps(orderInfo.DeliveryType);
    const activeStep = statusSteps.indexOf(currentStatus);

    const handleStatusChange = async (orderId, orderStatus) => {

        const success = await onStatusChange(orderId, orderStatus);

        if (success && orderStatus !== "Delivered") {
            onClose();
        }

        // Delivered is when staff print the bill — keep the dialog open
        // and go straight to the print view instead of closing on them.
        if (success && orderStatus === "Delivered") {
            setTimeout(() => window.print(), 300);
        }

        return success;

    };

    const handleCancelOrder = async (orderId) => {

        const success = await onCancel(orderId);

        if (success) {
            onClose();
        }

        return success;

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <GlobalStyles styles={printStyles} />

            <Box className="order-print-area" sx={{ display: "none", "@media print": { display: "block" } }}>
                <BillContent order={order} payment={payment} />
            </Box>

            <DialogTitle>
                Order Details
            </DialogTitle>

            <DialogContent>

                <Typography>
                    <strong>Order ID :</strong> #{orderInfo.OrderId}
                </Typography>

                <Typography>
                    <strong>Customer :</strong> {orderInfo.CustomerName}
                    {orderInfo.CustomerPhone && (
                        <>
                            {" — "}
                            <a href={`tel:${orderInfo.CustomerPhone}`} style={{ color: "#0F766E", fontWeight: 600 }}>
                                {orderInfo.CustomerPhone}
                            </a>
                        </>
                    )}
                </Typography>

                <Typography>
                    <strong>Payment :</strong> {orderInfo.PaymentMethod}
                </Typography>

                <Typography>
                    <strong>Order Type :</strong> {orderInfo.DeliveryType}
                    {orderInfo.DeliveryType === "Dine In" && orderInfo.TableNumber &&
                        ` (Table ${orderInfo.TableNumber})`}
                </Typography>

                <Typography sx={{ mb: 3 }}>
                    <strong>Total :</strong> ₹ {orderInfo.TotalAmount}
                </Typography>

                {isCancelled ? (

                    <Alert severity="error" sx={{ mb: 3 }}>
                        This order has been cancelled.
                    </Alert>

                ) : (

                    <Box sx={{ overflowX: "auto", mb: 3 }}>

                        <Stepper activeStep={activeStep} alternativeLabel sx={{ minWidth: 480 }}>

                            {statusSteps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}

                        </Stepper>

                    </Box>

                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>

                    {!isTerminal(currentStatus) && (

                        <QuickStatusControl
                            order={orderInfo}
                            onStatusChange={handleStatusChange}
                            onCancelOrder={handleCancelOrder}
                            size="medium"
                        />

                    )}

                    {currentStatus === "Pending" && (

                        <Button
                            variant="outlined"
                            startIcon={<EditRoundedIcon />}
                            onClick={() => setEditItemsOpen(true)}
                        >
                            Edit Items
                        </Button>

                    )}

                    {isTerminal(currentStatus) && (

                        <Typography color="text.secondary">
                            This order is {currentStatus.toLowerCase()} — no further action available.
                        </Typography>

                    )}

                </Box>

                <Divider sx={{ mb: 2 }} />

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {order.map((item) => (

                                <TableRow key={item.OrderItemId}>
                                    <TableCell>{item.ItemName}</TableCell>
                                    <TableCell>₹ {item.Price}</TableCell>
                                    <TableCell>{item.Quantity}</TableCell>
                                    <TableCell>₹ {item.TotalPrice}</TableCell>
                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            </DialogContent>

            <DialogActions>

                <Button
                    startIcon={<PrintRoundedIcon />}
                    onClick={() => window.print()}
                >
                    Print Bill
                </Button>

                <Button onClick={onClose}>
                    Close
                </Button>

            </DialogActions>

            <EditOrderItemsDialog
                open={editItemsOpen}
                onClose={() => setEditItemsOpen(false)}
                order={order}
                onSaved={() => {

                    setEditItemsOpen(false);
                    onItemsUpdated?.(orderInfo.OrderId);

                }}
            />

        </Dialog>

    );

}

export default OrderDetailsDialog;
