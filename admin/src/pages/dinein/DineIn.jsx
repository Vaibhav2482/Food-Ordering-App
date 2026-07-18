import { useEffect, useRef, useState } from "react";
import {
    Box,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import toast from "react-hot-toast";

import TableCard from "./TableCard";
import OrderBuilder from "../orders/OrderBuilder";
import OrderDetailsDialog from "../orders/OrderDetailsDialog";

import { getAllBranches } from "../../services/branchService";
import { getActiveTables } from "../../services/tableService";
import {
    getActiveTableOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} from "../../services/orderService";
import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

function DineIn() {

    const admin = getStoredAdmin();
    const ownerMode = isOwner(admin);

    const [branches, setBranches] = useState(
        ownerMode ? [] : [{ BranchId: admin.BranchId, BranchName: admin.BranchName }]
    );
    const [selectedBranchId, setSelectedBranchId] = useState(ownerMode ? null : admin.BranchId);
    const [tables, setTables] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const [tableSearch, setTableSearch] = useState("");

    const orderFormRef = useRef(null);

    useEffect(() => {

        if (ownerMode) {
            loadBranches();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (selectedBranchId) {
            loadTableState(selectedBranchId);
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

    const loadTableState = async (branchId) => {

        try {

            setLoading(true);

            const [tablesResponse, ordersResponse] = await Promise.all([
                getActiveTables(branchId),
                getActiveTableOrders(branchId)
            ]);

            if (tablesResponse.success) {
                setTables(tablesResponse.data);
            }

            if (ordersResponse.success) {
                setActiveOrders(ordersResponse.data);
            }

        } catch {

            toast.error("Failed to load table status.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (selectedTable) {
            orderFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }

    }, [selectedTable]);

    const getActiveOrderForTable = (tableName) =>
        activeOrders.find((order) => order.TableNumber === tableName);

    const filteredTables = tables.filter((table) =>
        table.TableName.toLowerCase().includes(tableSearch.trim().toLowerCase())
    );

    const handleTableClick = async (table) => {

        const activeOrder = getActiveOrderForTable(table.TableName);

        if (activeOrder) {

            try {

                const response = await getOrderById(activeOrder.OrderId);

                if (response.success) {
                    setSelectedOrder(response.data);
                    setOrderDialogOpen(true);
                }

            } catch {

                toast.error("Failed to load order details.");

            }

        } else {

            setSelectedTable(table);

        }

    };

    const handleItemsUpdated = async (orderId) => {

        try {

            const response = await getOrderById(orderId);

            if (response.success) {
                setSelectedOrder(response.data);
            }

            await loadTableState(selectedBranchId);

        } catch {

            toast.error("Failed to refresh order.");

        }

    };

    const handleOrderCreated = () => {

        setSelectedTable(null);
        loadTableState(selectedBranchId);

    };

    const handleStatusChange = async (orderId, orderStatus) => {

        try {

            const response = await updateOrderStatus(orderId, orderStatus);

            if (!response.success) {
                toast.error(response.message);
                return false;
            }

            toast.success(response.message);
            await loadTableState(selectedBranchId);
            return true;

        } catch {

            toast.error("Failed to update order status.");
            return false;

        }

    };

    const handleCancelOrder = async (orderId) => {

        try {

            const response = await cancelOrder(orderId);

            if (!response.success) {
                toast.error(response.message);
                return false;
            }

            toast.success(response.message);
            await loadTableState(selectedBranchId);
            return true;

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to cancel order.");
            return false;

        }

    };

    return (

        <Box>

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

                <Typography variant="h4" fontWeight={700}>
                    Dine In
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>

                    <TextField
                        size="small"
                        placeholder="Search tables..."
                        value={tableSearch}
                        onChange={(event) => setTableSearch(event.target.value)}
                        sx={{ width: 200 }}
                    />

                    {ownerMode && (

                        <FormControl size="small" sx={{ minWidth: 200 }}>

                            <InputLabel>Branch</InputLabel>

                            <Select
                                label="Branch"
                                value={selectedBranchId ?? ""}
                                onChange={(event) => {
                                    setSelectedBranchId(event.target.value);
                                    setSelectedTable(null);
                                }}
                            >

                                {branches.map((branch) => (
                                    <MenuItem key={branch.BranchId} value={branch.BranchId}>
                                        {branch.BranchName}
                                    </MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                    )}

                </Box>

            </Box>

            {!loading && tables.length === 0 && (

                <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
                    No tables set up for this branch yet — add some under Tables.
                </Typography>

            )}

            {!loading && tables.length > 0 && filteredTables.length === 0 && (

                <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
                    No tables match "{tableSearch}".
                </Typography>

            )}

            <Grid container spacing={2}>

                {filteredTables.map((table) => (

                    <Grid key={table.TableId} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>

                        <TableCard
                            table={table}
                            activeOrder={getActiveOrderForTable(table.TableName)}
                            onClick={() => handleTableClick(table)}
                        />

                    </Grid>

                ))}

            </Grid>

            {selectedTable && (

                <Card ref={orderFormRef} sx={{ p: 3, mt: 3, scrollMarginTop: 16 }}>

                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                        New Order — Table {selectedTable.TableName}
                    </Typography>

                    <OrderBuilder
                        key={`${selectedBranchId}-${selectedTable.TableId}`}
                        branchId={selectedBranchId}
                        deliveryType="Dine In"
                        tableNumber={selectedTable.TableName}
                        onCreated={handleOrderCreated}
                        onCancel={() => setSelectedTable(null)}
                    />

                </Card>

            )}

            <OrderDetailsDialog
                open={orderDialogOpen}
                onClose={() => {
                    setOrderDialogOpen(false);
                    setSelectedOrder([]);
                }}
                order={selectedOrder}
                onStatusChange={handleStatusChange}
                onCancel={handleCancelOrder}
                onItemsUpdated={handleItemsUpdated}
            />

        </Box>

    );

}

export default DineIn;
