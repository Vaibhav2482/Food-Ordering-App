import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

function OrdersTable({

    orders,
    loading,
    onView

}) {

    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":
                return "warning";

            case "Accepted":
                return "info";

            case "Preparing":
                return "primary";

            case "Ready":
                return "secondary";

            case "Out For Delivery":
                return "info";

            case "Delivered":
                return "success";

            case "Cancelled":
                return "error";

            default:
                return "default";

        }

    };

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: 300 }}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            Order ID
                        </TableCell>

                        <TableCell>
                            Customer
                        </TableCell>

                        <TableCell>
                            Payment
                        </TableCell>

                        <TableCell>
                            Delivery
                        </TableCell>

                        <TableCell align="right">
                            Total
                        </TableCell>

                        <TableCell>
                            Status
                        </TableCell>

                        <TableCell>
                            Date
                        </TableCell>

                        <TableCell align="center">
                            Action
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        orders.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={8}
                                    align="center"
                                >

                                    <Typography
                                        sx={{ py: 5 }}
                                    >

                                        No Orders Found

                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            orders.map((order) => (

                                <TableRow
                                    hover
                                    key={order.OrderId}
                                >

                                    <TableCell>

                                        #{order.OrderId}

                                    </TableCell>

                                    <TableCell>

                                        {order.CustomerName}

                                    </TableCell>

                                    <TableCell>

                                        {order.PaymentMethod}

                                    </TableCell>

                                    <TableCell>

                                        {order.DeliveryType}

                                    </TableCell>

                                    <TableCell align="right">

                                        ₹ {Number(order.TotalAmount).toFixed(2)}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={order.OrderStatus}
                                            color={getStatusColor(order.OrderStatus)}
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell>

                                        {

                                            new Date(
                                                order.OrderDate
                                            ).toLocaleDateString()

                                        }

                                    </TableCell>

                                    <TableCell align="center">

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                onView(
                                                    order.OrderId
                                                )
                                            }
                                        >

                                            <VisibilityIcon />

                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        )

                    }

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default OrdersTable;