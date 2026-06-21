import express from "express";

import {
    addToCart,
    getCart,
    updateCartQuantity,
    removeCartItem,
    clearCart
} from "../controllers/CartController.js";

const router = express.Router();

router.post("/", addToCart);

router.get("/:customerId", getCart);

router.put("/:cartId", updateCartQuantity);

router.delete("/:cartId", removeCartItem);

router.delete("/customer/:customerId", clearCart);

export default router;