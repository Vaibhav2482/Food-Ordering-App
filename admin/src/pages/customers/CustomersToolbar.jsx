import {
    Box,
    Paper,
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

        <Paper
            sx={{
                p: 2,
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap"
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
            >
                Customers
            </Typography>

            <Box
                sx={{
                    width: 350,
                    maxWidth: "100%"
                }}
            >

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search Customer..."
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(
                            event.target.value
                        )
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

            </Box>

        </Paper>

    );

}

export default CustomersToolbar;