import {
    Paper,
    Typography,
    Box,
    Skeleton
} from "@mui/material";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function formatDate(date) {

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short"

        }

    );

}

function SalesChart({

    salesData,
    loading

}) {

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

            <Box

                display="flex"

                justifyContent="space-between"

                alignItems="center"

                mb={3}

            >

                <Box>

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Sales Analytics

                    </Typography>

                    <Typography

                        color="text.secondary"

                        fontSize={13}

                    >

                        Revenue generated during the last 7 days

                    </Typography>

                </Box>

            </Box>

            {

                loading ?

                (

                    <Skeleton

                        variant="rounded"

                        height={320}

                    />

                )

                :

                (

                    <ResponsiveContainer

                        width="100%"

                        height="100%"

                    >

                        <LineChart

                            data={salesData}

                            margin={{

                                top: 10,

                                right: 10,

                                left: 0,

                                bottom: 0

                            }}

                        >

                            <CartesianGrid

                                stroke="#F3F4F6"

                                strokeDasharray="3 3"

                            />

                            <XAxis

                                dataKey="SalesDate"

                                tickFormatter={formatDate}

                                tickMargin={10}

                            />

                            <YAxis

                                tickFormatter={(value) => `₹${value}`}

                            />

                            <Tooltip

                                labelFormatter={formatDate}

                                formatter={(value) => [

                                    `₹ ${value}`,

                                    "Revenue"

                                ]}

                            />

                            <Line

                                type="monotone"

                                dataKey="TotalRevenue"

                                stroke="#F58220"

                                strokeWidth={4}

                                dot={{

                                    r: 5,

                                    strokeWidth: 2

                                }}

                                activeDot={{

                                    r: 8

                                }}

                            />

                        </LineChart>

                    </ResponsiveContainer>

                )

            }

        </Paper>

    );

}

export default SalesChart;