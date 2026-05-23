const express = require("express");

const router = express.Router();

const {
    getProductImages,
    getImagesByProductId,
    createProductImage,
    updateProductImage,
    deleteProductImage
} = require("../controllers/productImageController");

/* GET ALL */
router.get("/", getProductImages);

/* GET BY PRODUCT */
router.get("/product/:productId", getImagesByProductId);

/* CREATE */
router.post("/", createProductImage);

/* UPDATE */
router.put("/:id", updateProductImage);

/* DELETE */
router.delete("/:id", deleteProductImage);

module.exports = router;