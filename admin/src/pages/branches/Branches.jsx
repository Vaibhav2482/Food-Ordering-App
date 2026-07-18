import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import BranchToolbar from "./BranchToolbar";
import BranchTable from "./BranchTable";
import BranchDialog from "./BranchDialog";
import DeactivateBranchDialog from "./DeactivateBranchDialog";

import {
    getAllBranches,
    createBranch,
    updateBranch,
    deactivateBranch
} from "../../services/branchService";

function Branches() {

    const [branches, setBranches] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

    useEffect(() => {

        loadBranches();

    }, []);

    const loadBranches = async () => {

        try {

            setLoading(true);

            const response = await getAllBranches();

            if (response.success) {
                setBranches(response.data);
            }

        } catch {

            toast.error("Failed to load branches.");

        } finally {

            setLoading(false);

        }

    };

    const handleCreateBranch = async (branch) => {

        try {

            const response = await createBranch(branch);

            if (response.success) {
                await loadBranches();
                toast.success("Branch created successfully.");
                setOpenDialog(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleUpdateBranch = async (branch) => {

        try {

            const response = await updateBranch(selectedBranch.BranchId, branch);

            if (response.success) {
                await loadBranches();
                toast.success("Branch updated successfully.");
                setOpenDialog(false);
                setSelectedBranch(null);
                setIsEditMode(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleDeactivateBranch = async () => {

        try {

            const response = await deactivateBranch(selectedBranch.BranchId);

            if (response.success) {
                await loadBranches();
                toast.success("Branch deactivated successfully.");
                setDeactivateDialogOpen(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleEditBranch = (branch) => {

        setSelectedBranch(branch);
        setIsEditMode(true);
        setOpenDialog(true);

    };

    const filteredBranches = branches.filter((branch) =>
        branch.BranchName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (

        <Box>

            <BranchToolbar
                searchText={searchText}
                setSearchText={setSearchText}
                onAddClick={() => {
                    setSelectedBranch(null);
                    setIsEditMode(false);
                    setOpenDialog(true);
                }}
            />

            <BranchTable
                branches={filteredBranches}
                loading={loading}
                onEdit={handleEditBranch}
                onDeactivate={(branch) => {
                    setSelectedBranch(branch);
                    setDeactivateDialogOpen(true);
                }}
            />

            <BranchDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedBranch(null);
                    setIsEditMode(false);
                }}
                onSave={isEditMode ? handleUpdateBranch : handleCreateBranch}
                selectedBranch={selectedBranch}
                isEditMode={isEditMode}
            />

            <DeactivateBranchDialog
                open={deactivateDialogOpen}
                branch={selectedBranch}
                onClose={() => setDeactivateDialogOpen(false)}
                onDeactivate={handleDeactivateBranch}
            />

        </Box>

    );

}

export default Branches;
