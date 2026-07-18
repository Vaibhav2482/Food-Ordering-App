import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TableToolbar from "./TableToolbar";
import TableTable from "./TableTable";
import TableDialog from "./TableDialog";
import DeactivateTableDialog from "./DeactivateTableDialog";

import {
    getAllTables,
    createTable,
    updateTable,
    deactivateTable
} from "../../services/tableService";
import { getAllBranches } from "../../services/branchService";
import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

function Tables() {

    const admin = getStoredAdmin();
    const ownerMode = isOwner(admin);

    const [tables, setTables] = useState([]);
    const [branches, setBranches] = useState(
        ownerMode ? [] : [{ BranchId: admin.BranchId, BranchName: admin.BranchName }]
    );
    const [selectedBranchId, setSelectedBranchId] = useState(ownerMode ? null : admin.BranchId);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

    useEffect(() => {

        if (ownerMode) {
            loadBranches();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (selectedBranchId) {
            loadTables(selectedBranchId);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBranchId]);

    const loadBranches = async () => {

        try {

            const response = await getAllBranches();

            if (response.success) {

                setBranches(response.data);

                if (response.data.length > 0) {
                    setSelectedBranchId(response.data[0].BranchId);
                }

            }

        } catch {

            toast.error("Failed to load branches.");

        }

    };

    const loadTables = async (branchId) => {

        try {

            setLoading(true);

            const response = await getAllTables(branchId);

            if (response.success) {
                setTables(response.data);
            }

        } catch {

            toast.error("Failed to load tables.");

        } finally {

            setLoading(false);

        }

    };

    const handleCreateTable = async (table) => {

        try {

            const response = await createTable({ ...table, branchId: selectedBranchId });

            if (response.success) {
                await loadTables(selectedBranchId);
                toast.success("Table created successfully.");
                setOpenDialog(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleUpdateTable = async (table) => {

        try {

            const response = await updateTable(selectedTable.TableId, table);

            if (response.success) {
                await loadTables(selectedBranchId);
                toast.success("Table updated successfully.");
                setOpenDialog(false);
                setSelectedTable(null);
                setIsEditMode(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleDeactivateTable = async () => {

        try {

            const response = await deactivateTable(selectedTable.TableId);

            if (response.success) {
                await loadTables(selectedBranchId);
                toast.success("Table deactivated successfully.");
                setDeactivateDialogOpen(false);
            } else {
                toast.error(response.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong.");

        }

    };

    const handleEditTable = (table) => {

        setSelectedTable(table);
        setIsEditMode(true);
        setOpenDialog(true);

    };

    const filteredTables = tables.filter((table) =>
        table.TableName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (

        <Box>

            <TableToolbar
                searchText={searchText}
                setSearchText={setSearchText}
                branches={branches}
                selectedBranchId={selectedBranchId}
                setSelectedBranchId={setSelectedBranchId}
                ownerMode={ownerMode}
                onAddClick={() => {
                    setSelectedTable(null);
                    setIsEditMode(false);
                    setOpenDialog(true);
                }}
            />

            <TableTable
                tables={filteredTables}
                loading={loading}
                onEdit={handleEditTable}
                onDeactivate={(table) => {
                    setSelectedTable(table);
                    setDeactivateDialogOpen(true);
                }}
            />

            <TableDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setSelectedTable(null);
                    setIsEditMode(false);
                }}
                onSave={isEditMode ? handleUpdateTable : handleCreateTable}
                selectedTable={selectedTable}
                isEditMode={isEditMode}
            />

            <DeactivateTableDialog
                open={deactivateDialogOpen}
                table={selectedTable}
                onClose={() => setDeactivateDialogOpen(false)}
                onDeactivate={handleDeactivateTable}
            />

        </Box>

    );

}

export default Tables;
