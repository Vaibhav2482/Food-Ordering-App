import {
    Box,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Tooltip,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

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
import { getAllBranches } from "../../services/branchService";
import { getStoredAdmin, isOwner } from "../../utils/adminAuth";

function Dashboard() {

    const navigate = useNavigate();

    const admin = getStoredAdmin();
    const ownerMode = isOwner(admin);

    const [summary, setSummary] = useState(null);

    const [recentOrders, setRecentOrders] = useState([]);

    const [topSellingItems, setTopSellingItems] = useState([]);

    const [salesData, setSalesData] = useState([]);

    const [branches, setBranches] = useState([]);

    const [selectedBranchId, setSelectedBranchId] = useState(ownerMode ? "all" : admin.BranchId);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (ownerMode) {
            loadBranches();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        loadDashboard();

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

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const branchId = selectedBranchId === "all" ? undefined : selectedBranchId;

            const [

                summaryResponse,

                recentOrdersResponse,

                topSellingItemsResponse,

                salesResponse

            ] = await Promise.all([

                getDashboardSummary(branchId),

                getRecentOrders(branchId),

                getTopSellingItems(branchId),

                getSalesLast7Days(branchId)

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
            mb={2.5}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "flex-start" },
                flexWrap: "wrap",
                gap: 1.5
            }}
        >

            <Box>

                <Typography
                    variant="h5"
                    fontWeight={800}
                >
                    Dashboard
                </Typography>

                <Typography
                    color="text.secondary"
                    variant="body2"
                    mt={0.25}
                >
                    Welcome to ChaiChakhna Restaurant Management
                </Typography>

            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>

                {ownerMode && (

                    <FormControl size="small" sx={{ minWidth: 180 }}>

                        <Select
                            value={selectedBranchId}
                            onChange={(event) => setSelectedBranchId(event.target.value)}
                        >

                            <MenuItem value="all">
                                All Branches
                            </MenuItem>

                            {
                                branches.map(branch => (

                                    <MenuItem
                                        key={branch.BranchId}
                                        value={branch.BranchId}
                                    >
                                        {branch.BranchName}
                                    </MenuItem>

                                ))
                            }

                        </Select>

                    </FormControl>

                )}

                <Tooltip title="Refresh">

                    <IconButton size="small" onClick={loadDashboard} disabled={loading}>
                        <RefreshRoundedIcon fontSize="small" />
                    </IconButton>

                </Tooltip>

            </Box>

        </Box>

        <Grid
            container
            spacing={2}
        >

            {/* Top Cards */}

            <Grid
                size={{ xs: 12, sm: 6, xl: 3 }}
            >

                <StatCard
                    title="Today's Revenue"
                    value={`₹ ${summary?.TodayRevenue ?? 0}`}
                    subtitle="Today's Earnings"
                    color="#22C55E"
                    icon={<CurrencyRupeeRoundedIcon />}
                    loading={loading}
                    onClick={() => navigate("/reports")}
                />

            </Grid>

            <Grid
                size={{ xs: 12, sm: 6, xl: 3 }}
            >

                <StatCard
                    title="Today's Orders"
                    value={summary?.TodayOrders ?? 0}
                    subtitle="Orders Today"
                    color="#F58220"
                    icon={<ShoppingBagRoundedIcon />}
                    loading={loading}
                    onClick={() => navigate("/orders")}
                />

            </Grid>

            <Grid
                size={{ xs: 12, sm: 6, xl: 3 }}
            >

                <StatCard
                    title="Customers"
                    value={summary?.TotalCustomers ?? 0}
                    subtitle="Registered Customers"
                    color="#3B82F6"
                    icon={<PeopleRoundedIcon />}
                    loading={loading}
                    onClick={() => navigate("/customers")}
                />

            </Grid>

            <Grid
                size={{ xs: 12, sm: 6, xl: 3 }}
            >

                <StatCard
                    title="Menu Items"
                    value={summary?.TotalMenuItems ?? 0}
                    subtitle="Available Menu"
                    color="#0F766E"
                    icon={<RestaurantMenuRoundedIcon />}
                    loading={loading}
                    onClick={() => navigate("/menu")}
                />

            </Grid>

            {/* Charts */}

<Grid size={{ xs: 12, lg: 8 }}>
    <SalesChart
        salesData={salesData}
        loading={loading}
    />
</Grid>

<Grid size={{ xs: 12, lg: 4 }}>
    <TopSellingItems
        items={topSellingItems}
        loading={loading}
    />
</Grid>

<Grid size={{ xs: 12, lg: 8 }}>
    <RecentOrders
        orders={recentOrders}
        loading={loading}
    />
</Grid>

<Grid size={{ xs: 12, lg: 4 }}>
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