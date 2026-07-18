import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import { calculateGst } from "../../utils/gst";

function OrderSummary({ items, subtotal, branchName }) {

    const { cgst, sgst, total } = calculateGst(subtotal);

    return (

        <Card sx={{ p: { xs: 2, md: 3 }, position: { md: "sticky" }, top: { md: 96 } }}>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Order Summary
            </Typography>

            {branchName && (

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">Branch</Typography>
                    <Typography variant="body2" fontWeight={700}>{branchName}</Typography>
                </Box>

            )}

            <Stack spacing={1.5} divider={<Divider />}>

                {items.map((item) => (

                    <Box key={item.key} sx={{ display: "flex", justifyContent: "space-between" }}>

                        <Typography variant="body2">
                            {item.itemName} &times; {item.quantity}
                        </Typography>

                        <Typography variant="body2" fontWeight={600}>
                            {formatCurrency(item.totalPrice)}
                        </Typography>

                    </Box>

                ))}

            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={0.75}>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                    <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">CGST (2.5%)</Typography>
                    <Typography variant="body2">{formatCurrency(cgst)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">SGST (2.5%)</Typography>
                    <Typography variant="body2">{formatCurrency(sgst)}</Typography>
                </Box>

            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{formatCurrency(total)}</Typography>

            </Box>

        </Card>

    );

}

export default OrderSummary;
