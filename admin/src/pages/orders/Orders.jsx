import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import OrdersToolbar from "./OrdersToolbar";
import OrdersTable from "./OrdersTable";
import OrderDetailsDialog from "./OrderDetailsDialog";

import {

    getAllOrders,
    getOrderById,
    updateOrderStatus

} from "../../services/orderService";

function Orders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [selectedStatus, setSelectedStatus] =
        useState("all");

    const [selectedOrder, setSelectedOrder] =
        useState([]);

    const [openDialog, setOpenDialog] =
        useState(false);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            setLoading(true);

            const response =
                await getAllOrders();

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

            <OrdersToolbar

                searchText={searchText}

                setSearchText={setSearchText}

                selectedStatus={selectedStatus}

                setSelectedStatus={setSelectedStatus}

            />

            <OrdersTable

                orders={filteredOrders}

                loading={loading}

                onView={handleViewOrder}

            />

            <OrderDetailsDialog

                open={openDialog}

                onClose={() => {

                    setOpenDialog(false);

                    setSelectedOrder([]);

                }}

                order={selectedOrder}

                onStatusChange={handleStatusChange}

                refreshOrders={loadOrders}

            />

        </Box>

    );

}

export default Orders;