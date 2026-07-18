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

                borderRadius: 3,

                border: "1px solid #ECECEC",

                p: 2.5,

                height: 360,

                display: "flex",

                flexDirection: "column",

                overflow: "hidden"

            }}

        >

            <Box

                display="flex"

                justifyContent="space-between"

                alignItems="center"

                mb={1.5}

            >

                <Box>

                    <Typography

                        variant="subtitle1"

                        fontWeight={700}

                    >

                        Recent Orders

                    </Typography>

                    <Typography

                        fontSize={12.5}

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

                : orders.length === 0 ?

                (

                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        <Typography color="text.secondary">
                            No orders yet.
                        </Typography>

                    </Box>

                )
                :
                (

                    <TableContainer sx={{ flex: 1, overflow: "auto" }}>

                        <Table size="small">

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

                                                    py: 1

                                                }

                                            }}

                                        >

                                            <TableCell>

                                                <Box

                                                    display="flex"

                                                    alignItems="center"

                                                    gap={1.25}

                                                >

                                                    <Avatar

                                                        sx={{

                                                            bgcolor: "#FFF4EC",

                                                            color: "#F58220",

                                                            width: 30,

                                                            height: 30,

                                                            "& svg": { fontSize: 16 }

                                                        }}

                                                    >

                                                        <ShoppingBagRoundedIcon />

                                                    </Avatar>

                                                    <Typography

                                                        fontWeight={700}

                                                        fontSize={13.5}

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