const db = require("../config/db");

/* GET ALL REVIEWS */
const getReviews = (callback) => {

    const sql = `
        SELECT 
            reviews.*,
            users.userName,
            products.productName
        FROM reviews
        LEFT JOIN users
        ON reviews.userId = users.userId
        LEFT JOIN products
        ON reviews.productId = products.productId
    `;

    db.query(sql, callback);
};

/* GET REVIEW BY ID */
const getReviewById = (id, callback) => {

    const sql = `
        SELECT 
            reviews.*,
            users.userName,
            products.productName
        FROM reviews
        LEFT JOIN users
        ON reviews.userId = users.userId
        LEFT JOIN products
        ON reviews.productId = products.productId
        WHERE reviewId = ?
    `;

    db.query(sql, [id], callback);
};

/* GET REVIEWS BY PRODUCT */
const getReviewsByProductId = (productId, callback) => {

    const sql = `
        SELECT 
            reviews.*,
            users.userName
        FROM reviews
        LEFT JOIN users
        ON reviews.userId = users.userId
        WHERE productId = ?
    `;

    db.query(sql, [productId], callback);
};

/* CREATE REVIEW */
const createReview = (data, callback) => {

    const sql = `
        INSERT INTO reviews
        (
            userId,
            productId,
            orderId,
            rating,
            comment
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.userId,
            data.productId,
            data.orderId,
            data.rating,
            data.comment
        ],
        callback
    );
};

/* UPDATE REVIEW */
const updateReview = (id, data, callback) => {

    const sql = `
        UPDATE reviews
        SET
            rating = ?,
            comment = ?
        WHERE reviewId = ?
    `;

    db.query(
        sql,
        [
            data.rating,
            data.comment,
            id
        ],
        callback
    );
};

/* DELETE REVIEW */
const deleteReview = (id, callback) => {

    const sql = `
        DELETE FROM reviews
        WHERE reviewId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getReviews,
    getReviewById,
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview
};