import {
    Box,
    Grid,
    Typography
} from "@mui/material";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import OrderStatusChart from "./OrderStatusChart";
import RecentOrders from "./RecentOrders";
import TopSellingItems from "./TopSellingItems";

function Dashboard() {

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6} lg={3}>
                    <StatCard
                        title="Revenue"
                        value="₹18,450"
                        subtitle="+12% Today"
                        color="#22C55E"
                        icon={<CurrencyRupeeRoundedIcon />}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatCard
                        title="Orders"
                        value="124"
                        subtitle="Today's Orders"
                        color="#F58220"
                        icon={<ShoppingBagRoundedIcon />}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatCard
                        title="Customers"
                        value="248"
                        subtitle="Registered"
                        color="#3B82F6"
                        icon={<PeopleRoundedIcon />}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatCard
                        title="Menu Items"
                        value="52"
                        subtitle="Available"
                        color="#0F766E"
                        icon={<RestaurantMenuRoundedIcon />}
                    />
                </Grid>

                <Grid item xs={12} lg={8}>
                    <SalesChart />
                </Grid>

                <Grid item xs={12} lg={4}>
                    <OrderStatusChart />
                </Grid>

                <Grid item xs={12} lg={8}>
                    <RecentOrders />
                </Grid>

                <Grid item xs={12} lg={4}>
                    <TopSellingItems />
                </Grid>

            </Grid>

        </Box>

    );

}

export default Dashboard;