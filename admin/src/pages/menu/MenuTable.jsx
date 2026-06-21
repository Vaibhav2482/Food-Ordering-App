import {
    Avatar,
    Box,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function MenuTable({
    menuItems,
    onEdit,
    onDelete,
    loading }) {

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
                        <TableCell>Item Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

               <TableBody>

    {
        menuItems.length === 0 ? (

            <TableRow>

                <TableCell
                    colSpan={6}
                    align="center"
                    sx={{
                        py: 8
                    }}
                >

                    <Typography
                        variant="h6"
                        color="text.secondary"
                    >
                        No menu items found.
                    </Typography>

                </TableCell>

            </TableRow>

        ) : (

            menuItems.map((item) => (

                <TableRow
                    key={item.MenuItemId}
                    hover
                >

                    <TableCell>

                        <Avatar
                            sx={{
                                bgcolor: "#F58220"
                            }}
                        >
                            {item.ItemName.charAt(0)}
                        </Avatar>

                    </TableCell>

                    <TableCell>

                        <Typography fontWeight={600}>
                            {item.ItemName}
                        </Typography>

                    </TableCell>

                    <TableCell>
                        {item.CategoryName}
                    </TableCell>

                    <TableCell>
                        ₹{item.Price}
                    </TableCell>

                    <TableCell>

                        <Chip
                            label={
                                item.IsAvailable
                                    ? "Available"
                                    : "Unavailable"
                            }
                            color={
                                item.IsAvailable
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
                                onClick={() => onEdit(item)}
                            >
                                <EditRoundedIcon />
                            </IconButton>

                            <IconButton
                                color="error"
                                onClick={() => onDelete(item.MenuItemId)}
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

export default MenuTable;