const express = require("express");

const router = express.Router();

const {
    getOrderDetails,
    getOrderDetailById,
    getDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} = require("../controllers/orderDetailController");

/* GET ALL */
router.get("/", getOrderDetails);

/* GET BY ID */
router.get("/:id", getOrderDetailById);

/* GET BY ORDER */
router.get("/order/:orderId", getDetailsByOrderId);

/* CREATE */
router.post("/", createOrderDetail);

/* UPDATE */
router.put("/:id", updateOrderDetail);

/* DELETE */
router.delete("/:id", deleteOrderDetail);

module.exports = router;