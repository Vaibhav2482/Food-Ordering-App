import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const data = [
    { name: "Pending", value: 18 },
    { name: "Preparing", value: 12 },
    { name: "Delivered", value: 96 },
    { name: "Cancelled", value: 5 }
];

const COLORS = [
    "#F59E0B",
    "#3B82F6",
    "#22C55E",
    "#EF4444"
];

function OrderStatusChart() {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >
                    Order Status
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}

export default OrderStatusChart;