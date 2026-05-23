const db = require("../config/db");

/* GET ALL SPECS */
const getProductSpecs = (callback) => {

    const sql = `
        SELECT 
            product_specs.*,
            products.productName
        FROM product_specs
        LEFT JOIN products
        ON product_specs.productId = products.productId
    `;

    db.query(sql, callback);
};

/* GET SPEC BY ID */
const getProductSpecById = (id, callback) => {

    const sql = `
        SELECT 
            product_specs.*,
            products.productName
        FROM product_specs
        LEFT JOIN products
        ON product_specs.productId = products.productId
        WHERE specId = ?
    `;

    db.query(sql, [id], callback);
};

/* GET SPECS BY PRODUCT */
const getSpecsByProductId = (productId, callback) => {

    const sql = `
        SELECT * FROM product_specs
        WHERE productId = ?
    `;

    db.query(sql, [productId], callback);
};

/* CREATE SPEC */
const createProductSpec = (data, callback) => {

    const sql = `
        INSERT INTO product_specs
        (
            productId,
            specName,
            specValue
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.productId,
            data.specName,
            data.specValue
        ],
        callback
    );
};

/* UPDATE SPEC */
const updateProductSpec = (id, data, callback) => {

    const sql = `
        UPDATE product_specs
        SET
            specName = ?,
            specValue = ?
        WHERE specId = ?
    `;

    db.query(
        sql,
        [
            data.specName,
            data.specValue,
            id
        ],
        callback
    );
};

/* DELETE SPEC */
const deleteProductSpec = (id, callback) => {

    const sql = `
        DELETE FROM product_specs
        WHERE specId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getProductSpecs,
    getProductSpecById,
    getSpecsByProductId,
    createProductSpec,
    updateProductSpec,
    deleteProductSpec
};