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

/* SEARCH PRODUCTS */
const searchProducts = (keyword, categoryId, callback) => {
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
        LEFT JOIN categories c ON p.categoryId = c.categoryId
        LEFT JOIN product_images pi ON p.productId = pi.productId AND pi.isMain = TRUE
        WHERE p.status = TRUE
          AND p.productName LIKE ?
    `;
    const params = [`%${keyword}%`];
    if (categoryId) {
        sql += ' AND p.categoryId = ?';
        params.push(categoryId);
    }
    sql += ' ORDER BY p.productName';
    db.query(sql, params, callback);
};

/* GET NEW PRODUCTS */
const getNewProducts = (limit, callback) => {
    const sql = `
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
        LEFT JOIN categories c ON p.categoryId = c.categoryId
        LEFT JOIN product_images pi ON p.productId = pi.productId AND pi.isMain = TRUE
        WHERE p.status = TRUE
        ORDER BY p.created_at DESC
        LIMIT ?
    `;
    db.query(sql, [limit], callback);
};

/* GET BEST SELLING PRODUCTS */
const getBestSellingProducts = (limit, callback) => {
    const sql = `
        SELECT
            p.productId,
            p.productName,
            p.price,
            p.description,
            p.categoryId,
            p.status,
            p.created_at,
            c.categoryName,
            pi.imageUrl,
            COALESCE(SUM(od.quantity), 0) AS totalSold
        FROM products p
        LEFT JOIN categories c ON p.categoryId = c.categoryId
        LEFT JOIN product_images pi ON p.productId = pi.productId AND pi.isMain = TRUE
        LEFT JOIN orderdetails od ON p.productId = od.productId
        LEFT JOIN orders o ON od.orderId = o.orderId AND o.status = 'delivered'
        WHERE p.status = TRUE
        GROUP BY p.productId, p.productName, p.price, p.description,
                 p.categoryId, p.status, p.created_at, c.categoryName, pi.imageUrl
        ORDER BY totalSold DESC
        LIMIT ?
    `;
    db.query(sql, [limit], callback);
};

/* GET FEATURED PRODUCTS (score = avg_rating * 0.5 + log(1 + totalSold) * 0.5) */
const getFeaturedProducts = (limit, callback) => {
    const sql = `
        SELECT
            p.productId,
            p.productName,
            p.price,
            p.description,
            p.categoryId,
            p.status,
            p.created_at,
            c.categoryName,
            pi.imageUrl,
            COALESCE(AVG(r.rating), 0) AS avgRating,
            COALESCE(SUM(od.quantity), 0) AS totalSold,
            (COALESCE(AVG(r.rating), 0) * 0.5 +
             LOG(1 + COALESCE(SUM(od.quantity), 0)) * 0.5) AS score
        FROM products p
        LEFT JOIN categories c ON p.categoryId = c.categoryId
        LEFT JOIN product_images pi ON p.productId = pi.productId AND pi.isMain = TRUE
        LEFT JOIN reviews r ON p.productId = r.productId
        LEFT JOIN orderdetails od ON p.productId = od.productId
        LEFT JOIN orders o ON od.orderId = o.orderId AND o.status = 'delivered'
        WHERE p.status = TRUE
        GROUP BY p.productId, p.productName, p.price, p.description,
                 p.categoryId, p.status, p.created_at, c.categoryName, pi.imageUrl
        ORDER BY score DESC
        LIMIT ?
    `;
    db.query(sql, [limit], callback);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getNewProducts,
    getBestSellingProducts,
    getFeaturedProducts
};