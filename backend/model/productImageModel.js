const db = require("../config/db");

/* GET ALL IMAGES */
const getProductImages = (callback) => {

    const sql = `
        SELECT * FROM product_images
    `;

    db.query(sql, callback);
};

/* GET IMAGE BY PRODUCT */
const getImagesByProductId = (productId, callback) => {

    const sql = `
        SELECT * FROM product_images
        WHERE productId = ?
    `;

    db.query(sql, [productId], callback);
};

/* CREATE IMAGE */
const createProductImage = (data, callback) => {

    const sql = `
        INSERT INTO product_images
        (
            productId,
            imageUrl,
            isMain
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.productId,
            data.imageUrl,
            data.isMain
        ],
        callback
    );
};

/* UPDATE IMAGE */
const updateProductImage = (id, data, callback) => {

    const sql = `
        UPDATE product_images
        SET
            imageUrl = ?,
            isMain = ?
        WHERE imageId = ?
    `;

    db.query(
        sql,
        [
            data.imageUrl,
            data.isMain,
            id
        ],
        callback
    );
};

/* DELETE IMAGE */
const deleteProductImage = (id, callback) => {

    const sql = `
        DELETE FROM product_images
        WHERE imageId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getProductImages,
    getImagesByProductId,
    createProductImage,
    updateProductImage,
    deleteProductImage
};