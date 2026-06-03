const express = require("express");
const router = express.Router();

const {
    getStockByProductId,
    getAllStock,
    createStock,
    updateStock,
    deleteStock
} = require("../controllers/productStockController");

router.get("/", getAllStock);
router.get("/product/:productId", getStockByProductId);
router.post("/", createStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

module.exports = router;