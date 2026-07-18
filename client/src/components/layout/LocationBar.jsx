import { useState } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useBranch } from "../../context/BranchContext";
import { useBranchSwitch } from "../../hooks/useBranchSwitch";
import SwitchBranchDialog from "../common/SwitchBranchDialog";

function LocationBar() {

    const { branches, selectedBranch } = useBranch();
    const { pendingBranchId, requestSwitch, confirmSwitch, cancelSwitch } = useBranchSwitch();

    const [anchorEl, setAnchorEl] = useState(null);

    if (branches.length === 0) {
        return null;
    }

    const handleSelect = (branchId) => {

        setAnchorEl(null);
        requestSwitch(branchId);

    };

    return (

        <>

            <Box
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    flexGrow: 1,
                    minWidth: 0,
                    cursor: "pointer"
                }}
            >

                <LocationOnRoundedIcon sx={{ color: "#F58220", flexShrink: 0 }} />

                <Box sx={{ minWidth: 0 }}>

                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.1, display: "block" }}>
                        Your Location
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>

                        <Typography fontWeight={700} noWrap sx={{ fontSize: 15 }}>
                            {selectedBranch?.BranchName || "Select Branch"}
                        </Typography>

                        <ExpandMoreRoundedIcon sx={{ fontSize: 18, color: "text.secondary", flexShrink: 0 }} />

                    </Box>

                </Box>

            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >

                {branches.map((branch) => (

                    <MenuItem
                        key={branch.BranchId}
                        selected={branch.BranchId === selectedBranch?.BranchId}
                        onClick={() => handleSelect(branch.BranchId)}
                    >
                        {branch.BranchName}
                    </MenuItem>

                ))}

            </Menu>

            <SwitchBranchDialog
                open={Boolean(pendingBranchId)}
                onCancel={cancelSwitch}
                onConfirm={confirmSwitch}
            />

        </>

    );

}

export default LocationBar;
