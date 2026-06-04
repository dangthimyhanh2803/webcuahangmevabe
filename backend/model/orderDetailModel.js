const db = require("../config/db");

/* GET ALL ORDER DETAILS */
const getOrderDetails = (callback) => {
    const sql = `
        SELECT
            orderdetails.*,
            products.productName AS name,
            pi.imageUrl AS image
        FROM orderdetails
                 LEFT JOIN products ON orderdetails.productId = products.productId
                 LEFT JOIN product_images pi
                           ON pi.productId = products.productId AND pi.isMain = 1
    `;
    db.query(sql, callback);
};

/* GET ORDER DETAIL BY ID */
const getOrderDetailById = (id, callback) => {
    const sql = `
        SELECT
            orderdetails.*,
            products.productName AS name,
            pi.imageUrl AS image
        FROM orderdetails
                 LEFT JOIN products ON orderdetails.productId = products.productId
                 LEFT JOIN product_images pi
                           ON pi.productId = products.productId AND pi.isMain = 1
        WHERE orderdetails.orderDetailId = ?
    `;
    db.query(sql, [id], callback);
};

/* GET DETAILS BY ORDER ID */
const getDetailsByOrderId = (orderId, callback) => {
    const sql = `
        SELECT
            orderdetails.*,
            products.productName AS name,
            pi.imageUrl AS image
        FROM orderdetails
                 LEFT JOIN products ON orderdetails.productId = products.productId
                 LEFT JOIN product_images pi
                           ON pi.productId = products.productId AND pi.isMain = 1
        WHERE orderdetails.orderId = ?
    `;
    db.query(sql, [orderId], callback);
};

/* CREATE ORDER DETAIL */
const createOrderDetail = (data, callback) => {
    const sql = `
        INSERT INTO orderdetails (orderId, productId, quantity, price, size)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.orderId,
        data.productId,
        data.quantity,
        data.price,
        data.size || "M"
    ], callback);
};

/* UPDATE ORDER DETAIL */
const updateOrderDetail = (id, data, callback) => {
    const sql = `
        UPDATE orderdetails
        SET productId = ?, quantity = ?, price = ?, size = ?
        WHERE orderDetailId = ?
    `;
    db.query(sql, [
        data.productId,
        data.quantity,
        data.price,
        data.size || "M",
        id
    ], callback);
};

/* DELETE ORDER DETAIL */
const deleteOrderDetail = (id, callback) => {
    const sql = `DELETE FROM orderdetails WHERE orderDetailId = ?`;
    db.query(sql, [id], callback);
};

module.exports = {
    getOrderDetails,
    getOrderDetailById,
    getDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};