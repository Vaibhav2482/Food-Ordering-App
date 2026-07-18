import { Box, Divider, Stack, Typography } from "@mui/material";

const formatCurrency = (amount) => `₹${(Number(amount) || 0).toFixed(2)}`;

function BillContent({ order, payment }) {

    const rows = order;
    const info = rows[0];

    return (

        <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 3, p: 4 }}>

            <Box sx={{ textAlign: "center", mb: 3 }}>

                <Typography variant="h5" fontWeight={800} sx={{ color: "#F58220" }}>
                    ChaiChakhna Company
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Fresh Chai &amp; Snacks
                </Typography>

            </Box>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={0.5} sx={{ mb: 2 }}>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">Invoice #</Typography>
                    <Typography variant="body2" fontWeight={700}>{info.OrderId}</Typography>
                </Stack>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body2">{new Date(info.OrderDate).toLocaleString()}</Typography>
                </Stack>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">Billed To</Typography>
                    <Typography variant="body2">{info.CustomerName}</Typography>
                </Stack>

            </Stack>

            <Divider sx={{ mb: 1 }} />

            <Box sx={{ display: "flex", fontWeight: 700, fontSize: 13, mb: 1 }}>
                <Box sx={{ flex: 1 }}>Item</Box>
                <Box sx={{ width: 40, textAlign: "center" }}>Qty</Box>
                <Box sx={{ width: 70, textAlign: "right" }}>Price</Box>
                <Box sx={{ width: 80, textAlign: "right" }}>Total</Box>
            </Box>

            <Divider sx={{ mb: 1 }} />

            {rows.map((row) => (

                <Box key={row.OrderItemId} sx={{ display: "flex", fontSize: 14, mb: 0.5 }}>
                    <Box sx={{ flex: 1 }}>{row.ItemName}</Box>
                    <Box sx={{ width: 40, textAlign: "center" }}>{row.Quantity}</Box>
                    <Box sx={{ width: 70, textAlign: "right" }}>{formatCurrency(row.Price)}</Box>
                    <Box sx={{ width: 80, textAlign: "right" }}>{formatCurrency(row.TotalPrice)}</Box>
                </Box>

            ))}

            <Divider sx={{ my: 2 }} />

            <Stack spacing={0.5}>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                    <Typography variant="body2">{formatCurrency(info.SubTotal)}</Typography>
                </Stack>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">CGST (2.5%)</Typography>
                    <Typography variant="body2">{formatCurrency(info.CgstAmount)}</Typography>
                </Stack>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">SGST (2.5%)</Typography>
                    <Typography variant="body2">{formatCurrency(info.SgstAmount)}</Typography>
                </Stack>

            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Grand Total</Typography>
                <Typography variant="h6">{formatCurrency(info.TotalAmount)}</Typography>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">Order Type</Typography>
                <Typography variant="body2">{info.DeliveryType}</Typography>
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                <Typography variant="body2">{info.PaymentMethod}</Typography>
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>

                <Typography variant="body2" color="text.secondary">Payment Status</Typography>

                <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ color: payment?.PaymentStatus === "Success" ? "success.main" : "warning.main" }}
                >
                    {payment?.PaymentStatus || "Pending"}
                </Typography>

            </Stack>

            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
                Thank you for ordering with ChaiChakhna!
            </Typography>

        </Box>

    );

}

export default BillContent;
