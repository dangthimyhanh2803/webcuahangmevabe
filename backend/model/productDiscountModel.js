const db = require("../config/db");

/* GET ALL PRODUCT DISCOUNTS */
const getProductDiscounts = (callback) => {

    const sql = `
        SELECT 
            product_discounts.*,
            products.productName,
            discounts.discountCode
        FROM product_discounts
        LEFT JOIN products
        ON product_discounts.productId = products.productId
        LEFT JOIN discounts
        ON product_discounts.discountId = discounts.discountId
    `;

    db.query(sql, callback);
};

/* GET BY ID */
const getProductDiscountById = (id, callback) => {

    const sql = `
        SELECT 
            product_discounts.*,
            products.productName,
            discounts.discountCode
        FROM product_discounts
        LEFT JOIN products
        ON product_discounts.productId = products.productId
        LEFT JOIN discounts
        ON product_discounts.discountId = discounts.discountId
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

/* GET DISCOUNTS BY PRODUCT */
const getDiscountsByProductId = (productId, callback) => {

    const sql = `
        SELECT 
            product_discounts.*,
            discounts.discountCode,
            discounts.discountValue,
            discounts.discountType
        FROM product_discounts
        LEFT JOIN discounts
        ON product_discounts.discountId = discounts.discountId
        WHERE productId = ?
    `;

    db.query(sql, [productId], callback);
};

/* CREATE */
const createProductDiscount = (data, callback) => {

    const sql = `
        INSERT INTO product_discounts
        (
            productId,
            discountId
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            data.productId,
            data.discountId
        ],
        callback
    );
};

/* UPDATE */
const updateProductDiscount = (id, data, callback) => {

    const sql = `
        UPDATE product_discounts
        SET
            productId = ?,
            discountId = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            data.productId,
            data.discountId,
            id
        ],
        callback
    );
};

/* DELETE */
const deleteProductDiscount = (id, callback) => {

    const sql = `
        DELETE FROM product_discounts
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getProductDiscounts,
    getProductDiscountById,
    getDiscountsByProductId,
    createProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
};