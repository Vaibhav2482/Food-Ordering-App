import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import OrdersToolbar from "./OrdersToolbar";
import OrdersTable from "./OrdersTable";
import OrderDetailsDialog from "./OrderDetailsDialog";
import NewOrderPanel from "./NewOrderPanel";

import {

    getAllOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder

} from "../../services/orderService";
import { getAllBranches } from "../../services/branchService";
import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

function Orders() {

    const admin = getStoredAdmin();
    const ownerMode = isOwner(admin);

    const [activeTab, setActiveTab] = useState(0);

    const [orders, setOrders] = useState([]);

    const [branches, setBranches] = useState(
        ownerMode ? [] : [{ BranchId: admin.BranchId, BranchName: admin.BranchName }]
    );

    const [selectedBranchId, setSelectedBranchId] =
        useState(ownerMode ? "all" : admin.BranchId);

    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [selectedStatus, setSelectedStatus] =
        useState("all");

    const [selectedOrder, setSelectedOrder] =
        useState([]);

    const [openDialog, setOpenDialog] =
        useState(false);

    useEffect(() => {

        if (ownerMode) {
            loadBranches();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        loadOrders();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBranchId]);

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

    const loadOrders = async () => {

        try {

            setLoading(true);

            const response =
                await getAllOrders(
                    selectedBranchId === "all" ? undefined : selectedBranchId
                );

            if (response.success) {

                setOrders(response.data);

            }
            else {

                toast.error(response.message);

            }

        }
        catch {

            toast.error(
                "Failed to load orders."
            );

        }
        finally {

            setLoading(false);

        }

    };

    const handleViewOrder = async (
        orderId
    ) => {

        try {

            const response =
                await getOrderById(orderId);

            if (response.success) {

                setSelectedOrder(
                    response.data
                );

                setOpenDialog(true);

            }
            else {

                toast.error(
                    response.message
                );

            }

        }
        catch {

            toast.error(
                "Failed to load order details."
            );

        }

    };

    const handleStatusChange = async (

        orderId,

        orderStatus

    ) => {

        try {

            const response =
                await updateOrderStatus(

                    orderId,

                    orderStatus

                );

            if (!response.success) {

                toast.error(
                    response.message
                );

                return false;

            }

            toast.success(
                response.message
            );

            await loadOrders();

            return true;

        }
        catch {

            toast.error(
                "Failed to update order status."
            );

            return false;

        }

    };

    const handleItemsUpdated = async (orderId) => {

        try {

            const response = await getOrderById(orderId);

            if (response.success) {
                setSelectedOrder(response.data);
            }

            await loadOrders();

        } catch {

            toast.error("Failed to refresh order.");

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

            await loadOrders();

            return true;

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to cancel order."
            );

            return false;

        }

    };

        const filteredOrders = orders.filter((order) => {

        const matchesSearch =

            order.CustomerName
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||

            order.OrderId
                .toString()
                .includes(searchText);

        const matchesStatus =

            selectedStatus === "all"

                ? true

                : order.OrderStatus === selectedStatus;

        return (

            matchesSearch &&
            matchesStatus

        );

    });

    return (

        <Box>

            <Tabs
                value={activeTab}
                onChange={(event, value) => setActiveTab(value)}
                sx={{ mb: 3 }}
            >

                <Tab label="All Orders" />
                <Tab label="New Order" />

            </Tabs>

            {activeTab === 0 ? (

                <>

                    <OrdersToolbar

                        searchText={searchText}

                        setSearchText={setSearchText}

                        selectedStatus={selectedStatus}

                        setSelectedStatus={setSelectedStatus}

                        branches={branches}

                        selectedBranchId={selectedBranchId}

                        setSelectedBranchId={setSelectedBranchId}

                        ownerMode={ownerMode}

                    />

                    <OrdersTable

                        orders={filteredOrders}

                        loading={loading}

                        onView={handleViewOrder}

                        onStatusChange={handleStatusChange}

                        onCancelOrder={handleCancelOrder}

                    />

                    <OrderDetailsDialog

                        open={openDialog}

                        onClose={() => {

                            setOpenDialog(false);

                            setSelectedOrder([]);

                        }}

                        order={selectedOrder}

                        onStatusChange={handleStatusChange}

                        onCancel={handleCancelOrder}

                        onItemsUpdated={handleItemsUpdated}

                        refreshOrders={loadOrders}

                    />

                </>

            ) : (

                <NewOrderPanel

                    branches={branches}

                    defaultBranchId={selectedBranchId === "all" ? undefined : selectedBranchId}

                    ownerMode={ownerMode}

                    onCreated={() => {

                        loadOrders();
                        setActiveTab(0);

                    }}

                />

            )}

        </Box>

    );

}

export default Orders;
