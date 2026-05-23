const express = require("express");

const router = express.Router();

const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

/* GET ALL */
router.get("/", getOrders);

/* GET BY ID */
router.get("/:id", getOrderById);

/* CREATE */
router.post("/", createOrder);

/* UPDATE */
router.put("/:id", updateOrder);

/* DELETE */
router.delete("/:id", deleteOrder);

module.exports = router;