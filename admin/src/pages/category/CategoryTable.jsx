import {
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

function CategoryTable({

    categories,
    loading,
    onEdit,
    onToggleActive

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
                            Visible to Customers
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

                                        <Tooltip title={category.IsActive ? "Visible on the customer menu" : "Hidden from the customer menu"}>

                                            <Switch
                                                checked={category.IsActive}
                                                onChange={() => onToggleActive(category)}
                                                color="success"
                                            />

                                        </Tooltip>

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
