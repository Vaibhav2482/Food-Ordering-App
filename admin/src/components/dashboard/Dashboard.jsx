import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import OrderStatusChart from "./OrderStatusChart";
import RecentOrders from "./RecentOrders";
import TopSellingItems from "./TopSellingItems";

import {
    getDashboardSummary,
    getRecentOrders,
    getTopSellingItems,
    getSalesLast7Days
} from "../../services/dashboardService";

function Dashboard() {

    const [summary, setSummary] = useState(null);

    const [recentOrders, setRecentOrders] = useState([]);

    const [topSellingItems, setTopSellingItems] = useState([]);

    const [salesData, setSalesData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [

                summaryResponse,

                recentOrdersResponse,

                topSellingItemsResponse,

                salesResponse

            ] = await Promise.all([

                getDashboardSummary(),

                getRecentOrders(),

                getTopSellingItems(),

                getSalesLast7Days()

            ]);

            if (summaryResponse.success) {

                setSummary(summaryResponse.data);

            }

            if (recentOrdersResponse.success) {

                setRecentOrders(recentOrdersResponse.data);

            }

            if (topSellingItemsResponse.success) {

                setTopSellingItems(topSellingItemsResponse.data);

            }

            if (salesResponse.success) {

                setSalesData(salesResponse.data);

            }

        }
        catch {

            toast.error("Failed to load dashboard.");

        }
        finally {

            setLoading(false);

        }

    };

return (

    <Box
        sx={{
            bgcolor: "#F8FAFC",
            minHeight: "100%",
            p: {
                xs: 2,
                md: 3
            }
        }}
    >

        <Box
            mb={4}
        >

            <Typography
                variant="h4"
                fontWeight={800}
            >
                Dashboard
            </Typography>

            <Typography
                color="text.secondary"
                mt={0.5}
            >
                Welcome to ChaiChakhna Restaurant Management
            </Typography>

        </Box>

        <Grid
            container
            spacing={3}
        >

            {/* Top Cards */}

            <Grid
                item
                xs={12}
                sm={6}
                xl={3}
            >

                <StatCard
                    title="Today's Revenue"
                    value={`₹ ${summary?.TodayRevenue ?? 0}`}
                    subtitle="Today's Earnings"
                    color="#22C55E"
                    icon={<CurrencyRupeeRoundedIcon />}
                    loading={loading}
                />

            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                xl={3}
            >

                <StatCard
                    title="Today's Orders"
                    value={summary?.TodayOrders ?? 0}
                    subtitle="Orders Today"
                    color="#F58220"
                    icon={<ShoppingBagRoundedIcon />}
                    loading={loading}
                />

            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                xl={3}
            >

                <StatCard
                    title="Customers"
                    value={summary?.TotalCustomers ?? 0}
                    subtitle="Registered Customers"
                    color="#3B82F6"
                    icon={<PeopleRoundedIcon />}
                    loading={loading}
                />

            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                xl={3}
            >

                <StatCard
                    title="Menu Items"
                    value={summary?.TotalMenuItems ?? 0}
                    subtitle="Available Menu"
                    color="#0F766E"
                    icon={<RestaurantMenuRoundedIcon />}
                    loading={loading}
                />

            </Grid>

            {/* Charts */}

<Grid item xs={12} lg={8}>
    <SalesChart
        salesData={salesData}
        loading={loading}
    />
</Grid>

<Grid item xs={12} lg={4}>
    <TopSellingItems
        items={topSellingItems}
        loading={loading}
    />
</Grid>

<Grid item xs={12} lg={8}>
    <RecentOrders
        orders={recentOrders}
        loading={loading}
    />
</Grid>

<Grid item xs={12} lg={4}>
    <OrderStatusChart
        summary={summary}
        loading={loading}
    />
</Grid>



        </Grid>

    </Box>

);

}

export default Dashboard;