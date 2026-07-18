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

function BranchTable({

    branches,
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

                        <TableCell>Branch Name</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        branches.length === 0 ? (

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
                                        No branches found.
                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            branches.map((branch) => (

                                <TableRow
                                    key={branch.BranchId}
                                    hover
                                >

                                    <TableCell>

                                        <Typography fontWeight={600}>
                                            {branch.BranchName}
                                        </Typography>

                                    </TableCell>

                                    <TableCell>
                                        {branch.City || "-"}
                                    </TableCell>

                                    <TableCell>
                                        {branch.Phone || "-"}
                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={branch.IsActive ? "Active" : "Inactive"}
                                            color={branch.IsActive ? "success" : "default"}
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Box>

                                            <IconButton
                                                color="primary"
                                                onClick={() => onEdit(branch)}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                disabled={!branch.IsActive}
                                                onClick={() => onDeactivate(branch)}
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

export default BranchTable;
