import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminToolbar from "./AdminToolbar";
import AdminTable from "./AdminTable";
import AdminDialog from "./AdminDialog";
import DeactivateAdminDialog from "./DeactivateAdminDialog";

import {
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deactivateAdmin
} from "../../services/adminService";
import { getAllBranches } from "../../services/branchService";
import { getStoredAdmin } from "../../utils/adminAuth";

function Admins() {

    const currentAdmin = getStoredAdmin();

    const [admins, setAdmins] = useState([]);
    const [branches, setBranches] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

    useEffect(() => {

        loadAdmins();
        loadBranches();

    }, []);

    const loadAdmins = async () => {

        try {

            setLoading(true);

            const response = await getAllAdmins();

            if (response.success) {
                setAdmins(response.data);
            }

        } catch {

            toast.error("Failed to load admins.");

        } finally {

            setLoading(false);

        }

    };

    const loadBranches = async () => {

        try {

            const response = await getAllBranches();

            if (response.success) {
                setBranches(response.data);
            }

        } catch {

            toast.error("Failed to load branches.");

        }

    };

    const handleCreateAdmin = async (admin) => {

        try {

            const response = await createAdmin(admin);

            if (response.success) {
                await loadAdmins();
                toast.success("Admin created successfully.");
                setOpenDialog(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleUpdateAdmin = async (admin) => {

        try {

            const response = await updateAdmin(selectedAdmin.AdminId, admin);

            if (response.success) {
                await loadAdmins();
                toast.success("Admin updated successfully.");
                setOpenDialog(false);
                setSelectedAdmin(null);
                setIsEditMode(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleDeactivateAdmin = async () => {

        try {

            const response = await deactivateAdmin(selectedAdmin.AdminId);

            if (response.success) {
                await loadAdmins();
                toast.success("Admin deactivated successfully.");
                setDeactivateDialogOpen(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleEditAdmin = (admin) => {

        setSelectedAdmin(admin);
        setIsEditMode(true);
        setOpenDialog(true);

    };

    const filteredAdmins = admins.filter((admin) =>
        admin.FullName.toLowerCase().includes(searchText.toLowerCase()) ||
        admin.Email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (

        <Box>

            <AdminToolbar
                searchText={searchText}
                setSearchText={setSearchText}
                onAddClick={() => {
                    setSelectedAdmin(null);
                    setIsEditMode(false);
                    setOpenDialog(true);
                }}
            />

            <AdminTable
                admins={filteredAdmins}
                loading={loading}
                currentAdminId={currentAdmin?.AdminId}
                onEdit={handleEditAdmin}
                onDeactivate={(admin) => {
                    setSelectedAdmin(admin);
                    setDeactivateDialogOpen(true);
                }}
            />

            <AdminDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedAdmin(null);
                    setIsEditMode(false);
                }}
                onSave={isEditMode ? handleUpdateAdmin : handleCreateAdmin}
                selectedAdmin={selectedAdmin}
                isEditMode={isEditMode}
                branches={branches}
            />

            <DeactivateAdminDialog
                open={deactivateDialogOpen}
                admin={selectedAdmin}
                onClose={() => setDeactivateDialogOpen(false)}
                onDeactivate={handleDeactivateAdmin}
            />

        </Box>

    );

}

export default Admins;
