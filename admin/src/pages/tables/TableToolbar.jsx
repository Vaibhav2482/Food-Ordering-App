import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

function TableToolbar({

    searchText,
    setSearchText,
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
                Table Management
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

                    <FormControl
                        size="small"
                        sx={{ minWidth: 200 }}
                    >

                        <InputLabel>
                            Branch
                        </InputLabel>

                        <Select
                            value={selectedBranchId ?? ""}
                            label="Branch"
                            onChange={(event) =>
                                setSelectedBranchId(event.target.value)
                            }
                        >

                            {
                                branches.map(branch => (

                                    <MenuItem
                                        key={branch.BranchId}
                                        value={branch.BranchId}
                                    >
                                        {branch.BranchName}
                                    </MenuItem>

                                ))
                            }

                        </Select>

                    </FormControl>

                )}

                <TextField
                    size="small"
                    placeholder="Search tables..."
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(event.target.value)
                    }
                    sx={{
                        width: 220
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={onAddClick}
                >
                    Add Table
                </Button>

            </Box>

        </Box>

    );

}

export default TableToolbar;
