const express = require("express");
const router = express.Router();
const {
    getOrders,
    getOrderById,
    getOrdersByUserId,
    createOrder,
    updateOrder,
    deleteOrder,
    cancelOrder
} = require("../controllers/orderController");

// Các route
router.get("/", getOrders);
router.get("/user/:userId", getOrdersByUserId);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.patch("/:id/cancel", cancelOrder);

module.exports = router;