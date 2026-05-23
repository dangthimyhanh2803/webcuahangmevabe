const db = require("../config/db");

/* GET ALL ORDER DETAILS */
const getOrderDetails = (callback) => {

    const sql = `
        SELECT 
            orderdetails.*,
            products.productName
        FROM orderdetails
        LEFT JOIN products
        ON orderdetails.productId = products.productId
    `;

    db.query(sql, callback);
};

/* GET ORDER DETAIL BY ID */
const getOrderDetailById = (id, callback) => {

    const sql = `
        SELECT 
            orderdetails.*,
            products.productName
        FROM orderdetails
        LEFT JOIN products
        ON orderdetails.productId = products.productId
        WHERE orderDetailId = ?
    `;

    db.query(sql, [id], callback);
};

/* GET DETAILS BY ORDER */
const getDetailsByOrderId = (orderId, callback) => {

    const sql = `
        SELECT 
            orderdetails.*,
            products.productName
        FROM orderdetails
        LEFT JOIN products
        ON orderdetails.productId = products.productId
        WHERE orderId = ?
    `;

    db.query(sql, [orderId], callback);
};

/* CREATE ORDER DETAIL */
const createOrderDetail = (data, callback) => {

    const sql = `
        INSERT INTO orderdetails
        (
            orderId,
            productId,
            quantity,
            price
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.orderId,
            data.productId,
            data.quantity,
            data.price
        ],
        callback
    );
};

/* UPDATE ORDER DETAIL */
const updateOrderDetail = (id, data, callback) => {

    const sql = `
        UPDATE orderdetails
        SET
            productId = ?,
            quantity = ?,
            price = ?
        WHERE orderDetailId = ?
    `;

    db.query(
        sql,
        [
            data.productId,
            data.quantity,
            data.price,
            id
        ],
        callback
    );
};

/* DELETE ORDER DETAIL */
const deleteOrderDetail = (id, callback) => {

    const sql = `
        DELETE FROM orderdetails
        WHERE orderDetailId = ?
    `;

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