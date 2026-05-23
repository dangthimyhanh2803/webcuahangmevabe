const db = require("../config/db");

/* GET ALL CATEGORY */
const getCategories = (callback) => {

    const sql = "SELECT * FROM categories";

    db.query(sql, callback);
};

/* GET CATEGORY BY ID */
const getCategoryById = (id, callback) => {

    const sql = `
        SELECT * FROM categories
        WHERE categoryId = ?
    `;

    db.query(sql, [id], callback);
};

/* CREATE CATEGORY */
const createCategory = (data, callback) => {

    const sql = `
        INSERT INTO categories
        (
            categoryName
        )
        VALUES (?)
    `;

    db.query(
        sql,
        [
            data.categoryName
        ],
        callback
    );
};

/* UPDATE CATEGORY */
const updateCategory = (id, data, callback) => {

    const sql = `
        UPDATE categories
        SET categoryName = ?
        WHERE categoryId = ?
    `;

    db.query(
        sql,
        [
            data.categoryName,
            id
        ],
        callback
    );
};

/* DELETE CATEGORY */
const deleteCategory = (id, callback) => {

    const sql = `
        DELETE FROM categories
        WHERE categoryId = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};