const db = require("../config/db");

/* GET ALL DISCOUNTS */
const getDiscounts = (callback) => {

    const sql = `
        SELECT * FROM discounts
    `;

    db.query(sql, callback);
};

/* GET DISCOUNT BY ID */
const getDiscountById = (id, callback) => {

    const sql = `
        SELECT * FROM discounts
        WHERE discountId = ?
    `;

    db.query(sql, [id], callback);
};

/* CREATE DISCOUNT */
const createDiscount = (data, callback) => {

    const sql = `
        INSERT INTO discounts
        (
            discountCode,
            discountValue,
            discountType,
            startDate,
            endDate,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.discountCode,
            data.discountValue,
            data.discountType,
            data.startDate,
            data.endDate,
            data.status
        ],
        callback
    );
};

/* UPDATE DISCOUNT */
const updateDiscount = (id, data, callback) => {

    const sql = `
        UPDATE discounts
        SET
            discountCode = ?,
            discountValue = ?,
            discountType = ?,
            startDate = ?,
            endDate = ?,
            status = ?
        WHERE discountId = ?
    `;

    db.query(
        sql,
        [
            data.discountCode,
            data.discountValue,
            data.discountType,
            data.startDate,
            data.endDate,
            data.status,
            id
        ],
        callback
    );
};

/* DELETE DISCOUNT */
const deleteDiscount = (id, callback) => {

    const sql = `
        DELETE FROM discounts
        WHERE discountId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount
};