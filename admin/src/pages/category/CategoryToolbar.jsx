import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

function CategoryToolbar({

    searchText,
    setSearchText,
    onAddClick

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
                Category Management
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center"
                }}
            >

                <TextField
                    size="small"
                    placeholder="Search categories..."
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(event.target.value)
                    }
                    sx={{
                        width: 250
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={onAddClick}
                >
                    Add Category
                </Button>

            </Box>

        </Box>

    );

}

export default CategoryToolbar;