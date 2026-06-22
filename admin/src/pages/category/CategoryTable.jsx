import {
    Avatar,
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

function CategoryTable({

    categories,
    loading,
    onEdit,
    onDelete

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

                        <TableCell>Image</TableCell>

                        <TableCell>
                            Category Name
                        </TableCell>

                        <TableCell>
                            Description
                        </TableCell>

                        <TableCell>
                            Display Order
                        </TableCell>

                        <TableCell>
                            Status
                        </TableCell>

                        <TableCell align="center">
                            Actions
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {

                        categories.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{ py: 8 }}
                                >

                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        No categories found.
                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            categories.map((category) => (

                                <TableRow
                                    key={category.CategoryId}
                                    hover
                                >

                                    <TableCell>

                                        <Avatar
                                            src={category.ImageUrl ?? ""}
                                            sx={{
                                                bgcolor: "#F58220"
                                            }}
                                        >
                                            {category.CategoryName.charAt(0)}
                                        </Avatar>

                                    </TableCell>

                                    <TableCell>

                                        <Typography
                                            fontWeight={600}
                                        >
                                            {category.CategoryName}
                                        </Typography>

                                    </TableCell>

                                    <TableCell>

                                        {

                                            category.Description || "-"

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            category.DisplayOrder

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={
                                                category.IsActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                            color={
                                                category.IsActive
                                                    ? "success"
                                                    : "error"
                                            }
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Box>

                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    onEdit(category)
                                                }
                                            >

                                                <EditRoundedIcon />

                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    onDelete(
                                                        category.CategoryId
                                                    )
                                                }
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

export default CategoryTable;