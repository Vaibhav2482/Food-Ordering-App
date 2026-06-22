import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

function OrdersToolbar({

    searchText,
    setSearchText,
    selectedStatus,
    setSelectedStatus

}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2
            }}
        >

            <Typography
                variant="h4"
                fontWeight={700}
            >
                Order Management
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap"
                }}
            >

                <TextField
                    size="small"
                    placeholder="Search Order ID / Customer"
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(
                            event.target.value
                        )
                    }
                    sx={{
                        width: 260
                    }}
                />

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 180
                    }}
                >

                    <InputLabel>
                        Status
                    </InputLabel>

                    <Select
    value={selectedStatus}
    label="Status"
    onChange={(event) =>
        setSelectedStatus(event.target.value)
    }
>
    <MenuItem value="all">
        All
    </MenuItem>

    <MenuItem value="Pending">
        Pending
    </MenuItem>

    <MenuItem value="Accepted">
        Accepted
    </MenuItem>

    <MenuItem value="Preparing">
        Preparing
    </MenuItem>

    <MenuItem value="Ready">
        Ready
    </MenuItem>

    <MenuItem value="Out For Delivery">
        Out For Delivery
    </MenuItem>

    <MenuItem value="Delivered">
        Delivered
    </MenuItem>

    <MenuItem value="Cancelled">
        Cancelled
    </MenuItem>

</Select>

                </FormControl>

            </Box>

        </Box>

    );

}

export default OrdersToolbar;