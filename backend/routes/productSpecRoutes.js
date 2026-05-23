const express = require("express");

const router = express.Router();

const {
    getProductSpecs,
    getProductSpecById,
    getSpecsByProductId,
    createProductSpec,
    updateProductSpec,
    deleteProductSpec
} = require("../controllers/productSpecController");

/* GET ALL */
router.get("/", getProductSpecs);

/* GET BY ID */
router.get("/:id", getProductSpecById);

/* GET BY PRODUCT */
router.get("/product/:productId", getSpecsByProductId);

/* CREATE */
router.post("/", createProductSpec);

/* UPDATE */
router.put("/:id", updateProductSpec);

/* DELETE */
router.delete("/:id", deleteProductSpec);

module.exports = router;