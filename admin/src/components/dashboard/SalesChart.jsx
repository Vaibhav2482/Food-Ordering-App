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

                borderRadius: 3,

                border: "1px solid #ECECEC",

                p: 2.5,

                height: 340,

                display: "flex",

                flexDirection: "column"

            }}

        >

            <Box

                display="flex"

                justifyContent="space-between"

                alignItems="center"

                mb={2}

            >

                <Box>

                    <Typography

                        variant="subtitle1"

                        fontWeight={700}

                    >

                        Sales Analytics

                    </Typography>

                    <Typography

                        color="text.secondary"

                        fontSize={12.5}

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

                        height={250}

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