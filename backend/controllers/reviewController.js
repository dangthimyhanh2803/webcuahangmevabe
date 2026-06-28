const Review = require("../model/reviewModel");

/* GET ALL */
const getReviews = (req, res) => {

    Review.getReviews((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getReviewById = (req, res) => {

    const id = req.params.id;

    Review.getReviewById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* GET BY PRODUCT */
const getReviewsByProductId = (req, res) => {

    const productId = req.params.productId;

    Review.getReviewsByProductId(productId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* CREATE */
const createReview = (req, res) => {

    Review.createReview(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Đánh giá thành công"
        });
    });
};

/* UPDATE */
const updateReview = (req, res) => {

    const id = req.params.id;

    Review.updateReview(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật đánh giá thành công"
        });
    });
};

/* DELETE */
const deleteReview = (req, res) => {

    const id = req.params.id;

    Review.deleteReview(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa đánh giá thành công"
        });
    });
};

module.exports = {
    getReviews,
    getReviewById,
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview
};