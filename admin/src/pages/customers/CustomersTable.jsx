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
    Tooltip,
    Typography
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

function CustomersTable({

    customers,
    loading,
    onView

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

                            Customer

                        </TableCell>

                        <TableCell>

                            Email

                        </TableCell>

                        <TableCell>

                            Phone

                        </TableCell>

                        <TableCell>

                            Registered

                        </TableCell>

                        <TableCell align="center">

                            Actions

                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        customers.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={5}
                                    align="center"
                                    sx={{ py: 8 }}
                                >

                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        No customers found.
                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                        customers.map((customer) => (

                            <TableRow
                                key={customer.CustomerId}
                                hover
                            >

                                <TableCell>

                                    {customer.FullName}

                                </TableCell>

                                <TableCell>

                                    {customer.Email}

                                </TableCell>

                                <TableCell>

                                    {customer.Phone}

                                </TableCell>

                                <TableCell>

                                    {

                                        new Date(

                                            customer.CreatedAt

                                        ).toLocaleDateString()

                                    }

                                </TableCell>

                                <TableCell align="center">

                                    <Tooltip title="View Details">

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                onView(
                                                    customer.CustomerId
                                                )
                                            }
                                        >

                                            <VisibilityIcon />

                                        </IconButton>

                                    </Tooltip>

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

export default CustomersTable;
