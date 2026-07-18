import {
    Box,
    TextField,
    Typography
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

function CustomersToolbar({

    searchText,
    setSearchText

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
                Customer Management
            </Typography>

            <TextField
                size="small"
                placeholder="Search customers..."
                value={searchText}
                onChange={(event) =>
                    setSearchText(event.target.value)
                }
                sx={{
                    width: 250
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    )
                }}
            />

        </Box>

    );

}

export default CustomersToolbar;
