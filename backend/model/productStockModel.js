const db = require("../config/db");

const getStockByProductId = (productId, callback) => {
    const sql = `SELECT * FROM product_stock WHERE productId = ?`;
    db.query(sql, [productId], callback);
};

const getAllStock = (callback) => {
    const sql = `
        SELECT product_stock.*, products.productName
        FROM product_stock
        LEFT JOIN products ON product_stock.productId = products.productId
    `;
    db.query(sql, callback);
};

const createStock = (data, callback) => {
    const sql = `INSERT INTO product_stock (productId, quantity) VALUES (?, ?)`;
    db.query(sql, [data.productId, data.quantity], callback);
};

const updateStock = (id, data, callback) => {
    const sql = `UPDATE product_stock SET quantity = ? WHERE stockId = ?`;
    db.query(sql, [data.quantity, id], callback);
};

const deleteStock = (id, callback) => {
    const sql = `DELETE FROM product_stock WHERE stockId = ?`;
    db.query(sql, [id], callback);
};

module.exports = {
    getStockByProductId,
    getAllStock,
    createStock,
    updateStock,
    deleteStock
};