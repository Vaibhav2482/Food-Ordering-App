import { Box } from "@mui/material";

const money = (amount) => (Number(amount) || 0).toFixed(2);

const mono = {
    fontFamily: "'Courier New', Courier, monospace",
    color: "#000",
    lineHeight: 1.45
};

const dashed = { borderTop: "1px dashed #000", my: 0.75 };

const row = { display: "flex", justifyContent: "space-between", gap: 1 };

// 80mm thermal-printer style receipt, identical to the admin bill so the
// customer's copy matches what the restaurant prints.
function ReceiptContent({ order, rows, payment }) {

    const totalQty = rows.reduce((sum, item) => sum + Number(item.Quantity || 0), 0);
    const orderDate = new Date(order.OrderDate);

    return (

        <Box sx={{ ...mono, width: 302, maxWidth: "100%", mx: "auto", bgcolor: "#fff", p: 1.5, fontSize: 12 }}>

            <Box sx={{ textAlign: "center" }}>

                <Box sx={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>
                    CHAI CHAKHNA COMPANY
                </Box>

                <Box>{order.BranchName}</Box>

                {order.BranchAddress && (
                    <Box>
                        {order.BranchAddress}, {order.BranchCity}
                        {order.BranchPincode ? ` - ${order.BranchPincode}` : ""}
                    </Box>
                )}

                {order.BranchPhone && <Box>Ph: {order.BranchPhone}</Box>}

            </Box>

            <Box sx={dashed} />

            <Box sx={row}>
                <Box>Bill No: <strong>{order.OrderId}</strong></Box>
                <Box>{order.DeliveryType}{order.TableNumber ? ` / T-${order.TableNumber}` : ""}</Box>
            </Box>

            <Box sx={row}>
                <Box>{orderDate.toLocaleDateString("en-IN")}</Box>
                <Box>{orderDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</Box>
            </Box>

            <Box>Name: {order.CustomerName}</Box>

            <Box sx={dashed} />

            <Box sx={{ ...row, fontWeight: 700 }}>
                <Box sx={{ flex: 1 }}>ITEM</Box>
                <Box sx={{ width: 30, textAlign: "center" }}>QTY</Box>
                <Box sx={{ width: 55, textAlign: "right" }}>RATE</Box>
                <Box sx={{ width: 60, textAlign: "right" }}>AMT</Box>
            </Box>

            <Box sx={dashed} />

            {rows.map((item) => (

                <Box key={item.OrderItemId} sx={{ ...row, mb: 0.25 }}>
                    <Box sx={{ flex: 1, wordBreak: "break-word" }}>{item.ItemName}</Box>
                    <Box sx={{ width: 30, textAlign: "center" }}>{item.Quantity}</Box>
                    <Box sx={{ width: 55, textAlign: "right" }}>{money(item.Price)}</Box>
                    <Box sx={{ width: 60, textAlign: "right" }}>{money(item.TotalPrice)}</Box>
                </Box>

            ))}

            <Box sx={dashed} />

            <Box sx={row}>
                <Box>Total Qty: {totalQty}</Box>
                <Box>Subtotal: {money(order.SubTotal)}</Box>
            </Box>

            <Box sx={{ ...row, justifyContent: "flex-end" }}>
                <Box>CGST @2.5%: {money(order.CgstAmount)}</Box>
            </Box>

            <Box sx={{ ...row, justifyContent: "flex-end" }}>
                <Box>SGST @2.5%: {money(order.SgstAmount)}</Box>
            </Box>

            <Box sx={dashed} />

            <Box sx={{ ...row, fontSize: 15, fontWeight: 700 }}>
                <Box>TOTAL</Box>
                <Box>Rs. {money(order.TotalAmount)}</Box>
            </Box>

            <Box sx={dashed} />

            <Box sx={row}>
                <Box>Pay Mode: {order.PaymentMethod}</Box>
                <Box>{payment?.PaymentStatus === "Success" ? "PAID" : "UNPAID"}</Box>
            </Box>

            {order.OrderNotes && <Box>Note: {order.OrderNotes}</Box>}

            <Box sx={dashed} />

            <Box sx={{ textAlign: "center", mt: 1 }}>

                <Box>Thank You! Visit Again!</Box>
                <Box sx={{ fontSize: 10 }}>Pure Veg | No Refined Oil | No Food Color</Box>

            </Box>

        </Box>

    );

}

export default ReceiptContent;
