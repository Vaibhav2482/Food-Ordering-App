import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from "@mui/material";

const rows = [
    {
        id: 1001,
        customer: "Rahul Sharma",
        amount: "₹320",
        status: "Pending"
    },
    {
        id: 1002,
        customer: "Amit Patil",
        amount: "₹540",
        status: "Preparing"
    },
    {
        id: 1003,
        customer: "Sneha Joshi",
        amount: "₹210",
        status: "Delivered"
    }
];

function RecentOrders() {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                >
                    Recent Orders
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Order</TableCell>

                            <TableCell>Customer</TableCell>

                            <TableCell>Amount</TableCell>

                            <TableCell>Status</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {rows.map((row) => (

                            <TableRow key={row.id}>

                                <TableCell>
                                    #{row.id}
                                </TableCell>

                                <TableCell>
                                    {row.customer}
                                </TableCell>

                                <TableCell>
                                    {row.amount}
                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={row.status}
                                        color={
                                            row.status === "Delivered"
                                                ? "success"
                                                : row.status === "Pending"
                                                ? "warning"
                                                : "info"
                                        }
                                    />

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}

export default RecentOrders;