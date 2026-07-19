import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BranchSelect from "../../components/BranchSelect";

function MenuToolbar({

    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    categories,
    branches,
    selectedBranchId,
    setSelectedBranchId,
    ownerMode = true,
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
                Menu Management
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center"
                }}
            >

                {ownerMode && (

                    <BranchSelect
                        branches={branches}
                        value={selectedBranchId}
                        onChange={setSelectedBranchId}
                    />

                )}

                <TextField
                    size="small"
                    placeholder="Search menu items..."
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(event.target.value)
                    }
                    sx={{
                        width: 250
                    }}
                />

<FormControl
    size="small"
    sx={{ minWidth: 220 }}
>

    <InputLabel>
        Category
    </InputLabel>

    <Select
        value={selectedCategory}
        label="Category"
        onChange={(event) =>
            setSelectedCategory(event.target.value)
        }
    >

        <MenuItem value="all">
            All Categories
        </MenuItem>

        {
            categories.map(category => (

                <MenuItem
                    key={category.CategoryId}
                    value={category.CategoryId}
                >
                    {category.CategoryName}
                </MenuItem>

            ))
        }

    </Select>

</FormControl>

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={onAddClick}
                >
                    Add Menu Item
                </Button>

            </Box>

        </Box>

    );

}

export default MenuToolbar;