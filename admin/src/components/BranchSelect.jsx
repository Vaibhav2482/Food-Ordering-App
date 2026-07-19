import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";

// One consistent, hard-to-miss branch picker for every owner-panel page.
// The store icon + orange accent make "which branch am I working on?"
// obvious at a glance.
function BranchSelect({ branches, value, onChange, allowAll = false, sx = {} }) {

    return (

        <FormControl size="small" sx={{ minWidth: 220, ...sx }}>

            <InputLabel sx={{ fontWeight: 600 }}>Branch</InputLabel>

            <Select
                label="Branch"
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
                MenuProps={{ variant: "menu" }}
                sx={{
                    fontWeight: 700,
                    bgcolor: "#FFF7ED",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#F58220" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#F58220" }
                }}
                renderValue={(selected) => {

                    const label = selected === "all"
                        ? "All Branches"
                        : branches.find((branch) => branch.BranchId === selected)?.BranchName || "";

                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <StoreRoundedIcon fontSize="small" sx={{ color: "#F58220" }} />
                            {label}
                        </Box>
                    );

                }}
            >

                {allowAll && (
                    <MenuItem value="all">All Branches</MenuItem>
                )}

                {branches.map((branch) => (
                    <MenuItem key={branch.BranchId} value={branch.BranchId}>
                        {branch.BranchName}
                    </MenuItem>
                ))}

            </Select>

        </FormControl>

    );

}

export default BranchSelect;
