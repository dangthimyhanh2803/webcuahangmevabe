const express = require("express");

const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getNewProducts,
    getBestSellingProducts,
    getFeaturedProducts
} = require("../controllers/productController");

/* GET ALL */
router.get("/", getProducts);

/* SEARCH / NEW / BEST SELLING / FEATURED — must be before /:id */
router.get("/search", searchProducts);
router.get("/new", getNewProducts);
router.get("/best-selling", getBestSellingProducts);
router.get("/featured", getFeaturedProducts);

/* GET BY ID */
router.get("/:id", getProductById);

/* CREATE */
router.post("/", createProduct);

/* UPDATE */
router.put("/:id", updateProduct);

/* DELETE */
router.delete("/:id", deleteProduct);

module.exports = router;