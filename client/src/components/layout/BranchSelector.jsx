import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useBranch } from "../../context/BranchContext";
import { useBranchSwitch } from "../../hooks/useBranchSwitch";
import SwitchBranchDialog from "../common/SwitchBranchDialog";

function BranchSelector() {

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

            <Button
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
                startIcon={<StoreRoundedIcon fontSize="small" />}
                endIcon={<ExpandMoreRoundedIcon fontSize="small" />}
                sx={{ textTransform: "none", flexShrink: 0 }}
            >

                <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 140 }}>
                    {selectedBranch?.BranchName || "Select Branch"}
                </Typography>

            </Button>

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

export default BranchSelector;
