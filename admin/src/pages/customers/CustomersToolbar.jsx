import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

function CustomersToolbar({

    searchText,
    setSearchText,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    sortOrder,
    setSortOrder

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

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>

                <TextField
                    size="small"
                    label="From"
                    type="date"
                    value={fromDate}
                    onChange={(event) => setFromDate(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 160 }}
                />

                <TextField
                    size="small"
                    label="To"
                    type="date"
                    value={toDate}
                    onChange={(event) => setToDate(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 160 }}
                />

                <FormControl size="small" sx={{ minWidth: 150 }}>

                    <InputLabel>Sort</InputLabel>

                    <Select
                        label="Sort"
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value)}
                    >
                        <MenuItem value="newest">Newest first</MenuItem>
                        <MenuItem value="oldest">Oldest first</MenuItem>
                        <MenuItem value="name">Name (A–Z)</MenuItem>
                    </Select>

                </FormControl>

                <TextField
                    size="small"
                    placeholder="Search customers..."
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(event.target.value)
                    }
                    sx={{
                        width: 220
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

        </Box>

    );

}

export default CustomersToolbar;
