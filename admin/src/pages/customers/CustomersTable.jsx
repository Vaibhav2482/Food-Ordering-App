import {
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomersTable({

    customers,
    loading,
    onView,
    onEdit,
    onDelete

}) {

    if (loading) {

        return (

            <Paper
                sx={{
                    p: 5,
                    textAlign: "center"
                }}
            >

                <CircularProgress />

            </Paper>

        );

    }

    if (customers.length === 0) {

        return (

            <Paper
                sx={{
                    p: 5,
                    textAlign: "center"
                }}
            >

                <Typography>

                    No customers found.

                </Typography>

            </Paper>

        );

    }

    return (

        <TableContainer component={Paper}>

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

                                    <Tooltip title="View">

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

                                    <Tooltip title="Edit">

                                        <IconButton
                                            color="warning"
                                            onClick={() =>
                                                onEdit(
                                                    customer.CustomerId
                                                )
                                            }
                                        >

                                            <EditIcon />

                                        </IconButton>

                                    </Tooltip>

                                    <Tooltip title="Delete">

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                onDelete(
                                                    customer
                                                )
                                            }
                                        >

                                            <DeleteIcon />

                                        </IconButton>

                                    </Tooltip>

                                </TableCell>

                            </TableRow>

                        ))

                    }

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default CustomersTable;