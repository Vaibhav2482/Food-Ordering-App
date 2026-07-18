import { Box, Card, Chip, Typography } from "@mui/material";
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded";

import { STATUS_COLOR } from "../../utils/orderStatus";

function TableCard({ table, activeOrder, onClick }) {

    const isOccupied = Boolean(activeOrder);

    return (

        <Card
            onClick={onClick}
            sx={{
                p: 2.5,
                cursor: "pointer",
                textAlign: "center",
                border: "2px solid",
                borderColor: isOccupied ? "warning.main" : "success.main",
                bgcolor: isOccupied ? "#FFF8E1" : "#F0FDF4",
                transition: "transform .15s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 168,
                "&:hover": { transform: "translateY(-2px)" }
            }}
        >

            <TableRestaurantRoundedIcon
                sx={{ fontSize: 36, color: isOccupied ? "warning.main" : "success.main", mb: 1 }}
            />

            <Typography fontWeight={700}>
                {table.TableName}
            </Typography>

            <Typography variant="caption" color="text.secondary" display="block" sx={{ minHeight: 18 }}>
                {table.Capacity ? `Seats ${table.Capacity}` : " "}
            </Typography>

            <Box sx={{ mt: 1, minHeight: 44, display: "flex", flexDirection: "column", alignItems: "center" }}>

                {isOccupied ? (

                    <>
                        <Chip
                            label={activeOrder.OrderStatus}
                            color={STATUS_COLOR[activeOrder.OrderStatus] || "default"}
                            size="small"
                        />

                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            #{activeOrder.OrderId} — ₹ {Number(activeOrder.TotalAmount).toFixed(2)}
                        </Typography>
                    </>

                ) : (

                    <>
                        <Chip label="Available" color="success" size="small" />

                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            {" "}
                        </Typography>
                    </>

                )}

            </Box>

        </Card>

    );

}

export default TableCard;
