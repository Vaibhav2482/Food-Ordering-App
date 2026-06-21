import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

const data = [
    { day: "Mon", sales: 3200 },
    { day: "Tue", sales: 4500 },
    { day: "Wed", sales: 3800 },
    { day: "Thu", sales: 5200 },
    { day: "Fri", sales: 6100 },
    { day: "Sat", sales: 8300 },
    { day: "Sun", sales: 7200 }
];

function SalesChart() {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >
                    Sales Overview
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient
                                id="sales"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#F58220"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#F58220"
                                    stopOpacity={0.05}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#F58220"
                            fillOpacity={1}
                            fill="url(#sales)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}

export default SalesChart;