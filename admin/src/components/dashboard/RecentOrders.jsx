import {
    Avatar,
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Skeleton
} from "@mui/material";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";

function getStatusColor(status) {

    switch (status) {

        case "Pending":
            return "warning";

        case "Accepted":
            return "info";

        case "Preparing":
            return "secondary";

        case "Ready":
            return "primary";

        case "Out For Delivery":
            return "primary";

        case "Delivered":
            return "success";

        case "Cancelled":
            return "error";

        default:
            return "default";

    }

}

function formatDate(date) {

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    );

}

function RecentOrders({

    orders,

    loading

}) {

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius: 4,

                border: "1px solid #ECECEC",

                p: 3,

                height: 450,

                display: "flex",

                flexDirection: "column"

            }}

        >

            <Box

                display="flex"

                justifyContent="space-between"

                alignItems="center"

                mb={3}

            >

                <Box>

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Recent Orders

                    </Typography>

                    <Typography

                        fontSize={13}

                        color="text.secondary"

                    >

                        Latest customer orders

                    </Typography>

                </Box>

            </Box>

            {

                loading ?

                (

                    <Skeleton

                        variant="rounded"

                        height={320}

                    />

                )

                :

                (

                    <TableContainer>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>

                                        Order

                                    </TableCell>

                                    <TableCell>

                                        Customer

                                    </TableCell>

                                    <TableCell>

                                        Amount

                                    </TableCell>

                                    <TableCell>

                                        Status

                                    </TableCell>

                                    <TableCell>

                                        Date

                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {

                                    orders.map((order) => (

                                        <TableRow

                                            hover

                                            key={order.OrderId}

                                            sx={{

                                                "& td": {

                                                    py: 2

                                                }

                                            }}

                                        >

                                            <TableCell>

                                                <Box

                                                    display="flex"

                                                    alignItems="center"

                                                    gap={2}

                                                >

                                                    <Avatar

                                                        sx={{

                                                            bgcolor: "#FFF4EC",

                                                            color: "#F58220",

                                                            width: 42,

                                                            height: 42

                                                        }}

                                                    >

                                                        <ShoppingBagRoundedIcon />

                                                    </Avatar>

                                                    <Typography

                                                        fontWeight={700}

                                                    >

                                                        #{order.OrderId}

                                                    </Typography>

                                                </Box>

                                            </TableCell>

                                            <TableCell>

                                                <Typography

                                                    fontWeight={600}

                                                >

                                                    {order.CustomerName}

                                                </Typography>

                                            </TableCell>

                                            <TableCell>

                                                <Typography

                                                    fontWeight={700}

                                                    color="#22C55E"

                                                >

                                                    ₹ {order.TotalAmount}

                                                </Typography>

                                            </TableCell>

                                            <TableCell>

                                                <Chip

                                                    size="small"

                                                    label={order.OrderStatus}

                                                    color={getStatusColor(order.OrderStatus)}

                                                />

                                            </TableCell>

                                            <TableCell>

                                                {formatDate(order.OrderDate)}

                                            </TableCell>

                                        </TableRow>

                                    ))

                                }

                            </TableBody>

                        </Table>

                    </TableContainer>

                )

            }

        </Paper>

    );

}

export default RecentOrders;