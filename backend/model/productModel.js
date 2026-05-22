const db = require("../config/db");

/* GET ALL PRODUCTS (optionally filtered by categoryId) */
const getProducts = (categoryId, callback) => {

    let sql = `
        SELECT
            p.productId,
            p.productName,
            p.price,
            p.description,
            p.categoryId,
            p.status,
            p.created_at,

            c.categoryName,

            pi.imageUrl

        FROM products p

                 LEFT JOIN categories c
                           ON p.categoryId = c.categoryId

                 LEFT JOIN product_images pi
                           ON p.productId = pi.productId
                               AND pi.isMain = TRUE
    `;

    const params = [];
    if (categoryId) {
        sql += ' WHERE p.categoryId = ?';
        params.push(categoryId);
    }

    db.query(sql, params, callback);
};


/* GET PRODUCT BY ID */
const getProductById = (id, callback) => {

    const sql = `
        SELECT
            p.productId,
            p.productName,
            p.price,
            p.description,
            p.status,
            p.created_at,

            c.categoryName,

            pi.imageUrl

        FROM products p

                 LEFT JOIN categories c
                           ON p.categoryId = c.categoryId

                 LEFT JOIN product_images pi
                           ON p.productId = pi.productId
                               AND pi.isMain = TRUE

        WHERE p.productId = ?
    `;

    db.query(sql, [id], callback);
};

/* CREATE PRODUCT */
const createProduct = (data, callback) => {

    const sql = `
        INSERT INTO products
        (
            productName,
            price,
            description,
            categoryId,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.productName,
            data.price,
            data.description,
            data.categoryId,
            data.status
        ],
        callback
    );
};

/* UPDATE PRODUCT */
const updateProduct = (id, data, callback) => {

    const sql = `
        UPDATE products
        SET
            productName = ?,
            price = ?,
            description = ?,
            categoryId = ?,
            status = ?
        WHERE productId = ?
    `;

    db.query(
        sql,
        [
            data.productName,
            data.price,
            data.description,
            data.categoryId,
            data.status,
            id
        ],
        callback
    );
};

/* DELETE PRODUCT */
const deleteProduct = (id, callback) => {

    const sql = `
        DELETE FROM products
        WHERE productId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};