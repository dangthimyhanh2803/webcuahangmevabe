const express = require("express");

const router = express.Router();

const {
    getProductDiscounts,
    getProductDiscountById,
    getDiscountsByProductId,
    createProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
} = require("../controllers/productDiscountController");

/* GET ALL */
router.get("/", getProductDiscounts);

/* GET BY ID */
router.get("/:id", getProductDiscountById);

/* GET BY PRODUCT */
router.get("/product/:productId", getDiscountsByProductId);

/* CREATE */
router.post("/", createProductDiscount);

/* UPDATE */
router.put("/:id", updateProductDiscount);

/* DELETE */
router.delete("/:id", deleteProductDiscount);

module.exports = router;