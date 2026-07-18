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

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function TableTable({

    tables,
    loading,
    onEdit,
    onDeactivate

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

                        <TableCell>Table Name</TableCell>
                        <TableCell>Capacity</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        tables.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={4}
                                    align="center"
                                    sx={{ py: 8 }}
                                >

                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        No tables found for this branch.
                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            tables.map((table) => (

                                <TableRow
                                    key={table.TableId}
                                    hover
                                >

                                    <TableCell>

                                        <Typography fontWeight={600}>
                                            {table.TableName}
                                        </Typography>

                                    </TableCell>

                                    <TableCell>
                                        {table.Capacity || "-"}
                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={table.IsActive ? "Active" : "Inactive"}
                                            color={table.IsActive ? "success" : "default"}
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Box>

                                            <IconButton
                                                color="primary"
                                                onClick={() => onEdit(table)}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                disabled={!table.IsActive}
                                                onClick={() => onDeactivate(table)}
                                            >
                                                <DeleteRoundedIcon />
                                            </IconButton>

                                        </Box>

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

export default TableTable;
