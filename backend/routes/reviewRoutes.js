const express = require("express");
const router = express.Router();
const {
    getReviews,
    getReviewById,
    getReviewsByProductId,
    getReviewsByUserId,
    createReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

/* GET ALL */
router.get("/", getReviews);


// Nếu đặt sau, Express sẽ hiểu "product" và "user" là giá trị của :id

/* GET BY PRODUCT */
router.get("/product/:productId", getReviewsByProductId);

/* GET BY USER */
router.get("/user/:userId", getReviewsByUserId);

/* GET BY ID — đặt SAU cùng */
router.get("/:id", getReviewById);

/* CREATE */
router.post("/", createReview);

/* UPDATE */
router.put("/:id", updateReview);

/* DELETE */
router.delete("/:id", deleteReview);

module.exports = router;
