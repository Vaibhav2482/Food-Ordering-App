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

function AdminTable({

    admins,
    loading,
    currentAdminId,
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

                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role / Branch</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        admins.length === 0 ? (

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
                                        No admins found.
                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            admins.map((admin) => (

                                <TableRow
                                    key={admin.AdminId}
                                    hover
                                >

                                    <TableCell>

                                        <Typography fontWeight={600}>
                                            {admin.FullName}
                                            {String(admin.AdminId) === String(currentAdminId) && " (you)"}
                                        </Typography>

                                    </TableCell>

                                    <TableCell>
                                        {admin.Email}
                                    </TableCell>

                                    <TableCell>

                                        {admin.BranchId ? (
                                            <Chip label={admin.BranchName} size="small" color="primary" />
                                        ) : (
                                            <Chip label="Owner" size="small" variant="outlined" />
                                        )}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={admin.IsActive ? "Active" : "Inactive"}
                                            color={admin.IsActive ? "success" : "default"}
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Box>

                                            <IconButton
                                                color="primary"
                                                onClick={() => onEdit(admin)}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                disabled={!admin.IsActive || String(admin.AdminId) === String(currentAdminId)}
                                                onClick={() => onDeactivate(admin)}
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

export default AdminTable;
