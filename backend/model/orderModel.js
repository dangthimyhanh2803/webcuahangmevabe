const db = require("../config/db");

/* GET ALL ORDERS */
const getOrders = (callback) => {

    const sql = `
        SELECT 
            orders.*,
            users.userName,
            discounts.discountCode
        FROM orders
        LEFT JOIN users
        ON orders.userId = users.userId
        LEFT JOIN discounts
        ON orders.discountId = discounts.discountId
    `;

    db.query(sql, callback);
};

/* GET ORDER BY ID */
const getOrderById = (id, callback) => {

    const sql = `
        SELECT 
            orders.*,
            users.userName,
            discounts.discountCode
        FROM orders
        LEFT JOIN users
        ON orders.userId = users.userId
        LEFT JOIN discounts
        ON orders.discountId = discounts.discountId
        WHERE orderId = ?
    `;

    db.query(sql, [id], callback);
};

/* CREATE ORDER */
const createOrder = (data, callback) => {

    const sql = `
        INSERT INTO orders
        (
            userId,
            addressId,
            totalAmount,
            discountId,
            discountAmount,
            finalAmount,
            paymentMethod,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.userId,
            data.addressId,
            data.totalAmount,
            data.discountId,
            data.discountAmount,
            data.finalAmount,
            data.paymentMethod,
            data.status
        ],
        callback
    );
};

/* UPDATE ORDER */
const updateOrder = (id, data, callback) => {

    const sql = `
        UPDATE orders
        SET
            userId = ?,
            addressId = ?,
            totalAmount = ?,
            discountId = ?,
            discountAmount = ?,
            finalAmount = ?,
            paymentMethod = ?,
            status = ?
        WHERE orderId = ?
    `;

    db.query(
        sql,
        [
            data.userId,
            data.addressId,
            data.totalAmount,
            data.discountId,
            data.discountAmount,
            data.finalAmount,
            data.paymentMethod,
            data.status,
            id
        ],
        callback
    );
};

/* DELETE ORDER */
const deleteOrder = (id, callback) => {

    const sql = `
        DELETE FROM orders
        WHERE orderId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};