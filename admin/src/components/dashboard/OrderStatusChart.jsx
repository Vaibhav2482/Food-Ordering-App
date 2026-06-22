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

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius: 4,

                border: "1px solid #ECECEC",

                p: 3,

                height: 430,

                display: "flex",

                flexDirection: "column"

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                mb={0.5}

            >

                Order Status

            </Typography>

            <Typography

                color="text.secondary"

                fontSize={13}

                mb={2}

            >

                Current order distribution

            </Typography>

            {

                loading ?

                (

                    <Skeleton

                        variant="circular"

                        width={180}

                        height={180}

                        sx={{

                            mx: "auto",

                            my: 2

                        }}

                    />

                )

                :

                (

                    <Box

                        sx={{

                            height: 190

                        }}

                    >

                        <ResponsiveContainer>

                            <PieChart>

                                <Pie

                                    data={data}

                                    innerRadius={55}

                                    outerRadius={85}

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

                spacing={1}

                mt={2}

            >

                {

                    data.map((item) => (

                        <Grid

                            item

                            xs={6}

                            key={item.name}

                        >

                            <Box

                                display="flex"

                                justifyContent="space-between"

                                alignItems="center"

                                sx={{

                                    bgcolor: "#FAFAFA",

                                    borderRadius: 2,

                                    px: 1.5,

                                    py: 1

                                }}

                            >

                                <Typography

                                    fontSize={12}

                                    fontWeight={600}

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

                                        minWidth: 36

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