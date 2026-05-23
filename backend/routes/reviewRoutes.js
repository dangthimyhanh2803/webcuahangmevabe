const express = require("express");

const router = express.Router();

const {
    getReviews,
    getReviewById,
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

/* GET ALL */
router.get("/", getReviews);

/* GET BY ID */
router.get("/:id", getReviewById);

/* GET BY PRODUCT */
router.get("/product/:productId", getReviewsByProductId);

/* CREATE */
router.post("/", createReview);

/* UPDATE */
router.put("/:id", updateReview);

/* DELETE */
router.delete("/:id", deleteReview);

module.exports = router;