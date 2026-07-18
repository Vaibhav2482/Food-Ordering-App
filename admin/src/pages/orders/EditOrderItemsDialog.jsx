import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import toast from "react-hot-toast";

import { getAllMenu } from "../../services/menuService";
import { getAllCategories } from "../../services/categoryService";
import { updateOrderItems } from "../../services/orderService";
import AdminMenuItemRow from "./AdminMenuItemRow";

function EditOrderItemsDialog({ open, onClose, order, onSaved }) {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [cartLines, setCartLines] = useState([]);
    const [itemSearch, setItemSearch] = useState("");
    const [saving, setSaving] = useState(false);

    const orderInfo = order?.[0];

    useEffect(() => {

        if (!open || !orderInfo) {
            return;
        }

        setCartLines(
            order.map((row) => ({
                menuItemId: row.MenuItemId,
                itemName: row.ItemName,
                price: Number(row.Price),
                quantity: row.Quantity
            }))
        );

        (async () => {

            try {

                const [categoryResponse, menuResponse] = await Promise.all([
                    getAllCategories(),
                    getAllMenu(orderInfo.BranchId)
                ]);

                if (categoryResponse.success) {
                    setCategories(categoryResponse.data.filter((category) => category.IsActive));
                }

                if (menuResponse.success) {
                    setMenuItems(menuResponse.data.filter((item) => item.IsAvailable));
                }

            } catch {

                toast.error("Failed to load menu.");

            }

        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, orderInfo?.OrderId]);

    const getQuantity = (menuItemId) =>
        cartLines.find((line) => line.menuItemId === menuItemId)?.quantity ?? 0;

    const handleIncrement = (menuItem) => {

        setCartLines((prev) => {

            const existing = prev.find((line) => line.menuItemId === menuItem.MenuItemId);

            if (existing) {
                return prev.map((line) =>
                    line.menuItemId === menuItem.MenuItemId
                        ? { ...line, quantity: line.quantity + 1 }
                        : line
                );
            }

            return [
                ...prev,
                {
                    menuItemId: menuItem.MenuItemId,
                    itemName: menuItem.ItemName,
                    price: Number(menuItem.Price),
                    quantity: 1
                }
            ];

        });

    };

    const handleDecrement = (menuItem) => {

        setCartLines((prev) => {

            const existing = prev.find((line) => line.menuItemId === menuItem.MenuItemId);

            if (!existing) {
                return prev;
            }

            if (existing.quantity <= 1) {
                return prev.filter((line) => line.menuItemId !== menuItem.MenuItemId);
            }

            return prev.map((line) =>
                line.menuItemId === menuItem.MenuItemId
                    ? { ...line, quantity: line.quantity - 1 }
                    : line
            );

        });

    };

    const sections = useMemo(() => {

        const search = itemSearch.trim().toLowerCase();

        return categories
            .map((category) => ({
                ...category,
                items: menuItems.filter((item) =>
                    item.CategoryId === category.CategoryId &&
                    item.ItemName.toLowerCase().includes(search)
                )
            }))
            .filter((category) => category.items.length > 0);

    }, [categories, menuItems, itemSearch]);

    const subtotal = cartLines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const cgst = Math.round(subtotal * 0.025 * 100) / 100;
    const sgst = Math.round(subtotal * 0.025 * 100) / 100;
    const total = subtotal + cgst + sgst;

    const handleSave = async () => {

        if (cartLines.length === 0) {
            toast.error("Order must contain at least one item.");
            return;
        }

        try {

            setSaving(true);

            const response = await updateOrderItems(
                orderInfo.OrderId,
                cartLines.map((line) => ({ menuItemId: line.menuItemId, quantity: line.quantity }))
            );

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success("Order items updated.");
            onSaved();

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to update order items.");

        } finally {

            setSaving(false);

        }

    };

    if (!orderInfo) {
        return null;
    }

    return (

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle>
                Edit Items — Order #{orderInfo.OrderId}
            </DialogTitle>

            <DialogContent>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Only available while this order is still Pending.
                </Typography>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search menu items..."
                    value={itemSearch}
                    onChange={(event) => setItemSearch(event.target.value)}
                    sx={{ mb: 2 }}
                />

                <Box sx={{ maxHeight: 280, overflowY: "auto", pr: 0.5 }}>

                    {sections.map((section) => (

                        <Box key={section.CategoryId} sx={{ mb: 2 }}>

                            <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ mb: 0.5 }}>
                                {section.CategoryName}
                            </Typography>

                            {section.items.map((item) => (

                                <AdminMenuItemRow
                                    key={item.MenuItemId}
                                    item={item}
                                    quantity={getQuantity(item.MenuItemId)}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                />

                            ))}

                        </Box>

                    ))}

                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ textAlign: "right" }}>

                    <Typography variant="body2" color="text.secondary">Subtotal: ₹ {subtotal.toFixed(2)}</Typography>
                    <Typography variant="body2" color="text.secondary">CGST (2.5%): ₹ {cgst.toFixed(2)}</Typography>
                    <Typography variant="body2" color="text.secondary">SGST (2.5%): ₹ {sgst.toFixed(2)}</Typography>
                    <Typography variant="h6" fontWeight={700}>Total: ₹ {total.toFixed(2)}</Typography>

                </Box>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose} disabled={saving}>
                    Cancel
                </Button>

                <Button variant="contained" disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default EditOrderItemsDialog;
