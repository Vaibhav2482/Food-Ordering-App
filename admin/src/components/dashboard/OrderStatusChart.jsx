import {
    Paper,
    Typography,
    Box,
    Grid,
    Chip,
    Skeleton
} from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = {

    Pending: "#F59E0B",

    Accepted: "#3B82F6",

    Preparing: "#8B5CF6",

    Ready: "#14B8A6",

    "Out For Delivery": "#F97316",

    Delivered: "#22C55E",

    Cancelled: "#EF4444"

};

function OrderStatusChart({

    summary,
    loading

}) {

    const data = [

        {
            name: "Pending",
            value: summary?.PendingOrders ?? 0
        },

        {
            name: "Accepted",
            value: summary?.AcceptedOrders ?? 0
        },

        {
            name: "Preparing",
            value: summary?.PreparingOrders ?? 0
        },

        {
            name: "Ready",
            value: summary?.ReadyOrders ?? 0
        },

        {
            name: "Out For Delivery",
            value: summary?.OutForDeliveryOrders ?? 0
        },

        {
            name: "Delivered",
            value: summary?.DeliveredOrders ?? 0
        },

        {
            name: "Cancelled",
            value: summary?.CancelledOrders ?? 0
        }

    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius: 3,

                border: "1px solid #ECECEC",

                p: 2.5,

                height: 360,

                display: "flex",

                flexDirection: "column"

            }}

        >

            <Typography

                variant="subtitle1"

                fontWeight={700}

                mb={0.25}

            >

                Order Status

            </Typography>

            <Typography

                color="text.secondary"

                fontSize={12.5}

                mb={1.5}

            >

                Current order distribution

            </Typography>

            {

                loading ?

                (

                    <Skeleton

                        variant="circular"

                        width={140}

                        height={140}

                        sx={{

                            mx: "auto",

                            my: 1

                        }}

                    />

                )

                : total === 0 ?

                (

                    <Box
                        sx={{
                            height: 140,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        <Typography color="text.secondary">
                            No orders yet.
                        </Typography>

                    </Box>

                )
                :
                (

                    <Box

                        sx={{

                            height: 140,

                            minHeight: 140,

                            flexShrink: 0

                        }}

                    >

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie

                                    data={data}

                                    innerRadius={42}

                                    outerRadius={65}

                                    paddingAngle={3}

                                    dataKey="value"

                                >

                                    {

                                        data.map((item) => (

                                            <Cell

                                                key={item.name}

                                                fill={COLORS[item.name]}

                                            />

                                        ))

                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </Box>

                )

            }

            <Grid

                container

                spacing={0.75}

                mt={1}

            >

                {

                    data.map((item) => (

                        <Grid

                            size={{ xs: 6 }}

                            key={item.name}

                        >

                            <Box

                                display="flex"

                                justifyContent="space-between"

                                alignItems="center"

                                sx={{

                                    bgcolor: "#FAFAFA",

                                    borderRadius: 1.5,

                                    px: 1,

                                    py: 0.5

                                }}

                            >

                                <Typography

                                    fontSize={11}

                                    fontWeight={600}

                                    sx={{ lineHeight: 1.2, mr: 0.5 }}

                                >

                                    {item.name}

                                </Typography>

                                <Chip

                                    label={item.value}

                                    size="small"

                                    sx={{

                                        bgcolor: COLORS[item.name],

                                        color: "#fff",

                                        fontWeight: 700,

                                        flexShrink: 0,

                                        minWidth: 30,

                                        height: 20,

                                        fontSize: 11,

                                        ml: 0.5

                                    }}

                                />

                            </Box>

                        </Grid>

                    ))

                }

            </Grid>

        </Paper>

    );

}

export default OrderStatusChart;