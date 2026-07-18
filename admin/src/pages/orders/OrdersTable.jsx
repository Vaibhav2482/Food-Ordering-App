import {
    Box,
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

import QuickStatusControl from "./QuickStatusControl";

function OrdersTable({

    orders,
    loading,
    onView,
    onStatusChange,
    onCancelOrder

}) {

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 350
                }}
            >

                <CircularProgress color="warning" />

            </Box>

        );

    }

    return (

        <TableContainer
            component={Paper}
            sx={{
                mt: 3,
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,.08)"
            }}
        >

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
                            Branch
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
                                    colSpan={9}
                                    align="center"
                                    sx={{ py: 8 }}
                                >

                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >

                                        No orders found.

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

                                        {order.BranchName}

                                    </TableCell>

                                    <TableCell>

                                        {order.PaymentMethod}

                                    </TableCell>

                                    <TableCell>

                                        {order.DeliveryType}
                                        {order.DeliveryType === "Dine In" && order.TableNumber &&
                                            ` (T-${order.TableNumber})`}

                                    </TableCell>

                                    <TableCell align="right">

                                        ₹ {Number(order.TotalAmount).toFixed(2)}

                                    </TableCell>

                                    <TableCell>

                                        <QuickStatusControl
                                            order={order}
                                            onStatusChange={onStatusChange}
                                            onCancelOrder={onCancelOrder}
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
