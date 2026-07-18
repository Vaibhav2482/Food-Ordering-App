import {
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
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

function MenuTable({
    menuItems,
    onEdit,
    onToggleAvailable,
    onToggleActive,
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
                        <TableCell>In Stock</TableCell>
                        <TableCell>Visible to Customers</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

               <TableBody>

    {
        menuItems.length === 0 ? (

            <TableRow>

                <TableCell
                    colSpan={7}
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

                        <Tooltip title={item.IsAvailable ? "In stock - orderable" : "Sold out - shown as Unavailable"}>

                            <Switch
                                checked={item.IsAvailable}
                                onChange={() => onToggleAvailable(item)}
                                color="success"
                            />

                        </Tooltip>

                    </TableCell>

                    <TableCell>

                        <Tooltip title={item.IsActive ? "Visible on the customer menu" : "Hidden from the customer menu entirely"}>

                            <Switch
                                checked={item.IsActive}
                                onChange={() => onToggleActive(item)}
                                color="success"
                            />

                        </Tooltip>

                    </TableCell>

                    <TableCell align="center">

                        <Stack direction="row" justifyContent="center">

                            <IconButton
                                color="primary"
                                onClick={() => onEdit(item)}
                            >
                                <EditRoundedIcon />
                            </IconButton>

                        </Stack>

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
