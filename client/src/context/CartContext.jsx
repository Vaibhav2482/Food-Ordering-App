import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { getGuestCart, setGuestCart, clearGuestCart } from "../utils/storage";
import * as cartService from "../services/cartService";

const CartContext = createContext(null);

const normalizeServerItem = (row) => ({
    key: `server-${row.CartId}`,
    cartId: row.CartId,
    menuItemId: row.MenuItemId,
    itemName: row.ItemName,
    price: Number(row.Price),
    quantity: row.Quantity,
    totalPrice: Number(row.TotalPrice)
});

const normalizeGuestItem = (item) => ({
    key: `guest-${item.menuItemId}`,
    cartId: null,
    menuItemId: item.menuItemId,
    itemName: item.itemName,
    price: Number(item.price),
    quantity: item.quantity,
    totalPrice: Number(item.price) * item.quantity,
    imageUrl: item.imageUrl
});

export function CartProvider({ children }) {

    const { customer, isAuthenticated } = useAuth();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [merging, setMerging] = useState(false);
    const [ready, setReady] = useState(false);

    // Tracks the last known-good state so an optimistic update can be rolled back on failure.
    const itemsRef = useRef([]);
    itemsRef.current = items;

    const refreshServerCart = useCallback(async (customerId) => {

        setLoading(true);

        try {

            const response = await cartService.getCart(customerId);

            if (response.success) {
                setItems(response.data.map(normalizeServerItem));
            }

        } catch {

            toast.error("Failed to load cart.");

        } finally {

            setLoading(false);
            setReady(true);

        }

    }, []);

    useEffect(() => {

        if (isAuthenticated && customer) {

            const guestItems = getGuestCart();

            if (guestItems.length > 0 && !merging) {

                setMerging(true);

                (async () => {

                    for (const item of guestItems) {

                        try {
                            await cartService.addToCart({
                                customerId: customer.CustomerId,
                                menuItemId: item.menuItemId,
                                quantity: item.quantity
                            });
                        } catch {
                            // Skip items that fail to merge (e.g. no longer available)
                        }

                    }

                    clearGuestCart();
                    await refreshServerCart(customer.CustomerId);
                    setMerging(false);

                })();

            } else {

                refreshServerCart(customer.CustomerId);

            }

        } else {

            setItems(getGuestCart().map(normalizeGuestItem));
            setReady(true);

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, customer?.CustomerId]);

    const addItem = async (menuItem, quantity = 1) => {

        const isIncrement = itemsRef.current.some((line) => line.menuItemId === menuItem.MenuItemId);

        if (isAuthenticated && customer) {

            const previousItems = itemsRef.current;

            // Optimistic update: reflect the change immediately, reconcile with the server after.
            const existing = previousItems.find((line) => line.menuItemId === menuItem.MenuItemId);

            const optimisticItems = existing
                ? previousItems.map((line) =>
                    line.menuItemId === menuItem.MenuItemId
                        ? { ...line, quantity: line.quantity + quantity, totalPrice: (line.quantity + quantity) * line.price }
                        : line
                )
                : [
                    ...previousItems,
                    {
                        key: `pending-${menuItem.MenuItemId}`,
                        cartId: null,
                        menuItemId: menuItem.MenuItemId,
                        itemName: menuItem.ItemName,
                        price: Number(menuItem.Price),
                        quantity,
                        totalPrice: Number(menuItem.Price) * quantity
                    }
                ];

            setItems(optimisticItems);

            if (!isIncrement) {
                toast.success(`${menuItem.ItemName} added to cart.`);
            }

            try {

                const response = await cartService.addToCart({
                    customerId: customer.CustomerId,
                    menuItemId: menuItem.MenuItemId,
                    quantity
                });

                if (!response.success) {
                    setItems(previousItems);
                    toast.error(response.message);
                    return;
                }

                await refreshServerCart(customer.CustomerId);

            } catch (error) {

                setItems(previousItems);
                toast.error(error.response?.data?.message || "Failed to add item to cart.");

            }

            return;

        }

        const guestItems = getGuestCart();
        const existing = guestItems.find((item) => item.menuItemId === menuItem.MenuItemId);

        let updated;

        if (existing) {
            updated = guestItems.map((item) =>
                item.menuItemId === menuItem.MenuItemId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updated = [
                ...guestItems,
                {
                    menuItemId: menuItem.MenuItemId,
                    itemName: menuItem.ItemName,
                    price: menuItem.Price,
                    quantity,
                    imageUrl: menuItem.ImageUrl
                }
            ];
        }

        setGuestCart(updated);
        setItems(updated.map(normalizeGuestItem));

        if (!isIncrement) {
            toast.success(`${menuItem.ItemName} added to cart.`);
        }

    };

    const updateQuantity = async (item, quantity) => {

        if (quantity <= 0) {
            return removeItem(item);
        }

        if (isAuthenticated && customer) {

            const previousItems = itemsRef.current;

            const optimisticItems = previousItems.map((line) =>
                line.key === item.key
                    ? { ...line, quantity, totalPrice: quantity * line.price }
                    : line
            );

            setItems(optimisticItems);

            try {

                const response = await cartService.updateCartQuantity(item.cartId, quantity);

                if (!response.success) {
                    setItems(previousItems);
                    toast.error(response.message);
                    return;
                }

            } catch {

                setItems(previousItems);
                toast.error("Failed to update quantity.");

            }

            return;

        }

        const guestItems = getGuestCart().map((guestItem) =>
            guestItem.menuItemId === item.menuItemId
                ? { ...guestItem, quantity }
                : guestItem
        );

        setGuestCart(guestItems);
        setItems(guestItems.map(normalizeGuestItem));

    };

    const removeItem = async (item) => {

        if (isAuthenticated && customer) {

            const previousItems = itemsRef.current;

            setItems(previousItems.filter((line) => line.key !== item.key));

            try {

                await cartService.removeCartItem(item.cartId);
                toast.success("Item removed from cart.");

            } catch {

                setItems(previousItems);
                toast.error("Failed to remove item.");

            }

            return;

        }

        const guestItems = getGuestCart().filter(
            (guestItem) => guestItem.menuItemId !== item.menuItemId
        );

        setGuestCart(guestItems);
        setItems(guestItems.map(normalizeGuestItem));
        toast.success("Item removed from cart.");

    };

    const clearCart = async () => {

        if (isAuthenticated && customer) {

            try {
                await cartService.clearCart(customer.CustomerId);
            } catch {
                // best-effort clear
            }

        } else {

            clearGuestCart();

        }

        setItems([]);

    };

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    const value = {
        items,
        loading: loading || merging,
        ready,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isServerCart: Boolean(isAuthenticated && customer)
    };

    return (

        <CartContext.Provider value={value}>

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}
