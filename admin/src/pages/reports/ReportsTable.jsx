import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip
} from "@mui/material";

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    );

}

function ReportsTable({

    reports,
    loading

}) {

    if (loading) {

        return (

            <Paper

                elevation={0}

                sx={{

                    p: 4,

                    borderRadius: 4,

                    border: "1px solid #ECECEC"

                }}

            >

                Loading...

            </Paper>

        );

    }

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius: 4,

                border: "1px solid #ECECEC",

                overflow: "hidden"

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                sx={{

                    p: 3,

                    pb: 2

                }}

            >

                Sales Report

            </Typography>

            <TableContainer>

                <Table>

                    <TableHead>

                         <TableRow
        sx={{
            bgcolor: "#F8FAFC"
        }}
    >

                           <TableCell
    sx={{
        fontWeight: 700,
        color: "#374151"
    }}
>
    Date
</TableCell>

                           <TableCell
    sx={{
        fontWeight: 700,
        color: "#374151"
    }}
>
    Orders
</TableCell>

                            <TableCell
    sx={{
        fontWeight: 700,
        color: "#374151"
    }}
>
    Revenue
</TableCell>

                           <TableCell
    sx={{
        fontWeight: 700,
        color: "#374151"
    }}
>
    Delivered
</TableCell>

                            <TableCell
    sx={{
        fontWeight: 700,
        color: "#374151"
    }}
>
    Cancelled
</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            reports.length === 0 ?

                            (

                                <TableRow>

                                    <TableCell

                                        colSpan={5}

                                        align="center"

                                    >

                                        No Records Found

                                    </TableCell>

                                </TableRow>

                            )

                            :

                            reports.map((row, index) => (

                                <TableRow

                                    key={index}

                                    hover

                                >

                                    <TableCell>

                                        {

                                            formatDate(

                                                row.SalesDate

                                            )

                                        }

                                    </TableCell>

                                    <TableCell align="center">

                                        <Chip

                                            label={

                                                row.TotalOrders

                                            }

                                            color="primary"

                                            size="small"

                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        ₹ {row.TotalRevenue}

                                    </TableCell>

                                    <TableCell align="center">

                                        <Chip

                                            label={

                                                row.DeliveredOrders

                                            }

                                            color="success"

                                            size="small"

                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Chip

                                            label={

                                                row.CancelledOrders

                                            }

                                            color="error"

                                            size="small"

                                        />

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}

export default ReportsTable;