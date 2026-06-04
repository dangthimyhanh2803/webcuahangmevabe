const db = require("../config/db");

/* GET ALL ORDERS */
const getOrders = (callback) => {
    const sql = `
        SELECT
            orders.*,
            users.userName,
            discounts.discountCode
        FROM orders
                 LEFT JOIN users ON orders.userId = users.userId
                 LEFT JOIN discounts ON orders.discountId = discounts.discountId
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
                 LEFT JOIN users ON orders.userId = users.userId
                 LEFT JOIN discounts ON orders.discountId = discounts.discountId
        WHERE orders.orderId = ?
    `;
    db.query(sql, [id], callback);
};

const getOrdersByUserId = (userId, callback) => {
    const sql = `
        SELECT
            orders.orderId AS id, -- Đổi tên thành id để khớp với frontend
            orders.userId,
            orders.addressId,
            orders.totalAmount,
            orders.discountId,
            orders.discountAmount,
            orders.finalAmount,
            orders.paymentMethod,
            orders.status,
            orders.created_at, -- Thêm các trường khác của bảng orders nếu cần
            users.userName,
            discounts.discountCode
        FROM orders
                 LEFT JOIN users ON orders.userId = users.userId
                 LEFT JOIN discounts ON orders.discountId = discounts.discountId
        WHERE orders.userId = ?
        ORDER BY orders.created_at DESC
    `;
    db.query(sql, [userId], callback);
};

/* CREATE ORDER */
const createOrder = (data, callback) => {
    const sql = `
        INSERT INTO orders
        (userId, addressId, totalAmount, discountId, discountAmount, finalAmount, paymentMethod, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.userId,
        data.addressId,
        data.totalAmount,
        data.discountId,
        data.discountAmount,
        data.finalAmount,
        data.paymentMethod,
        data.status
    ], callback);
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
    db.query(sql, [
        data.userId,
        data.addressId,
        data.totalAmount,
        data.discountId,
        data.discountAmount,
        data.finalAmount,
        data.paymentMethod,
        data.status,
        id
    ], callback);
};

/* DELETE ORDER */
const deleteOrder = (id, callback) => {
    const sql = `DELETE FROM orders WHERE orderId = ?`;
    db.query(sql, [id], callback);
};

module.exports = {
    getOrders,
    getOrderById,
    getOrdersByUserId,  // thêm export
    createOrder,
    updateOrder,
    deleteOrder
};