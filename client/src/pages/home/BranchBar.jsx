import { useState } from "react";
import { Box, Card, Menu, MenuItem, Stack, Typography } from "@mui/material";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useBranch } from "../../context/BranchContext";
import { useBranchSwitch } from "../../hooks/useBranchSwitch";
import SwitchBranchDialog from "../../components/common/SwitchBranchDialog";

function BranchBar() {

    const { branches, selectedBranch } = useBranch();
    const { pendingBranchId, requestSwitch, confirmSwitch, cancelSwitch } = useBranchSwitch();

    const [anchorEl, setAnchorEl] = useState(null);

    if (!selectedBranch) {
        return null;
    }

    const handleSelect = (branchId) => {

        setAnchorEl(null);
        requestSwitch(branchId);

    };

    return (

        <>

            <Card
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                    p: { xs: 1.5, md: 2 },
                    mb: { xs: 2, md: 4 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    cursor: "pointer",
                    border: "1px solid #F0D9BF",
                    bgcolor: "#FFF8F0",
                    flexWrap: "wrap"
                }}
            >

                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>

                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: "#FFE8D1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}
                    >
                        <StoreRoundedIcon sx={{ color: "#F58220" }} />
                    </Box>

                    <Box>

                        <Typography variant="caption" color="text.secondary">
                            You&apos;re ordering from
                        </Typography>

                        <Typography fontWeight={700}>
                            {selectedBranch.BranchName}
                        </Typography>

                        {(selectedBranch.Address || selectedBranch.City) && (

                            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mt: 0.25 }}>

                                <LocationOnRoundedIcon sx={{ fontSize: 15, color: "text.secondary" }} />

                                <Typography variant="body2" color="text.secondary">
                                    {[selectedBranch.Address, selectedBranch.City].filter(Boolean).join(", ")}
                                </Typography>

                            </Stack>

                        )}

                    </Box>

                </Stack>

                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: "#F58220" }}>

                    <Typography variant="body2" fontWeight={700}>
                        Change Branch
                    </Typography>

                    <ExpandMoreRoundedIcon fontSize="small" />

                </Stack>

            </Card>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >

                {branches.map((branch) => (

                    <MenuItem
                        key={branch.BranchId}
                        selected={branch.BranchId === selectedBranch.BranchId}
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

export default BranchBar;
