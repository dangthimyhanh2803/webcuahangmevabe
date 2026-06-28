const express = require("express");
const router = express.Router();
const {
    getReviews,
    getReviewById,
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

/* GET ALL */
router.get("/", getReviews);

/* GET BY PRODUCT */
router.get("/product/:productId", getReviewsByProductId);

/* GET BY ID — đặt SAU cùng */
router.get("/:id", getReviewById);

/* CREATE */
router.post("/", createReview);

/* UPDATE */
router.put("/:id", updateReview);

/* DELETE */
router.delete("/:id", deleteReview);

module.exports = router;
