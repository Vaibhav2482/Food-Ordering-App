import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";

function OrderDetailsDialog({

    open,
    onClose,
    order,
    onStatusChange

}) {

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (order && order.length > 0) {

            setStatus(order[0].OrderStatus);

        }

    }, [order]);

    if (!order || order.length === 0) {

        return null;

    }

    const orderInfo = order[0];

    const handleUpdate = async () => {

        const success = await onStatusChange(

            orderInfo.OrderId,

            status

        );

        if (success) {

            onClose();

        }

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Order Details

            </DialogTitle>

            <DialogContent>

                <Typography>

                    <strong>Order ID :</strong> #{orderInfo.OrderId}

                </Typography>

                <Typography>

                    <strong>Customer :</strong> {orderInfo.CustomerName}

                </Typography>

                <Typography>

                    <strong>Payment :</strong> {orderInfo.PaymentMethod}

                </Typography>

                <Typography>

                    <strong>Total :</strong> ₹ {orderInfo.TotalAmount}

                </Typography>

                <Typography>

                    <strong>Status :</strong>

                </Typography>

                <FormControl
                    fullWidth
                    sx={{ mt: 2, mb: 3 }}
                >

                    <InputLabel>

                        Status

                    </InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(event) =>
                            setStatus(
                                event.target.value
                            )
                        }
                    >

                        <MenuItem value="Pending">
                            Pending
                        </MenuItem>

                        <MenuItem value="Accepted">
                            Accepted
                        </MenuItem>

                        <MenuItem value="Preparing">
                            Preparing
                        </MenuItem>

                        <MenuItem value="Ready">
                            Ready
                        </MenuItem>

                        <MenuItem value="Out For Delivery">
                            Out For Delivery
                        </MenuItem>

                        <MenuItem value="Delivered">
                            Delivered
                        </MenuItem>

                        <MenuItem value="Cancelled">
                            Cancelled
                        </MenuItem>

                    </Select>

                </FormControl>

                <Divider sx={{ mb: 2 }} />

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>

                                    Item

                                </TableCell>

                                <TableCell>

                                    Price

                                </TableCell>

                                <TableCell>

                                    Qty

                                </TableCell>

                                <TableCell>

                                    Total

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {

                                order.map((item) => (

                                    <TableRow
                                        key={item.OrderItemId}
                                    >

                                        <TableCell>

                                            {item.ItemName}

                                        </TableCell>

                                        <TableCell>

                                            ₹ {item.Price}

                                        </TableCell>

                                        <TableCell>

                                            {item.Quantity}

                                        </TableCell>

                                        <TableCell>

                                            ₹ {item.TotalPrice}

                                        </TableCell>

                                    </TableRow>

                                ))

                            }

                        </TableBody>

                    </Table>

                </TableContainer>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >

                    Close

                </Button>

                <Button
                    variant="contained"
                    onClick={handleUpdate}
                >

                    Update Status

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default OrderDetailsDialog;