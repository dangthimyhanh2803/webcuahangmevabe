const db = require("../config/db");

/* GET ALL ACCOUNT */
const getAccounts = (callback) => {

    const sql = "SELECT * FROM users";

    db.query(sql, callback);
};

/* GET ACCOUNT BY ID */
const getAccountById = (id, callback) => {

    const sql = "SELECT * FROM users WHERE userId = ?";

    db.query(sql, [id], callback);
};

/* CREATE ACCOUNT */
const createAccount = (data, callback) => {

    const sql = `
        INSERT INTO users
        (
            userName,
            email,
            password,
            phone,
            isVerified
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.userName,
            data.email,
            data.password,
            data.phone,
            true
        ],
        callback
    );
};
const findByPhone = (phone, callback) => {

    const sql = `
        SELECT * FROM users
        WHERE phone = ?
    `;

    db.query(sql, [phone], callback);
};
const saveOtp = (
    phone,
    otp,
    expiredAt,
    callback
) => {

    const sql = `
        INSERT INTO otp_codes
        (
            phone,
            otp,
            expired_at
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            phone,
            otp,
            expiredAt
        ],
        callback
    );
};
const verifyOtp = (
    phone,
    otp,
    callback
) => {

    const sql = `
        SELECT *
        FROM otp_codes
        WHERE phone = ?
        AND otp = ?
        AND expired_at > NOW()
        ORDER BY created_at DESC
        LIMIT 1
    `;

    db.query(
        sql,
        [phone, otp],
        callback
    );

};
const updateAccount = (id, data, callback) => {

    const sql = `
        UPDATE users
        SET 
            userName = ?,
            email = ?,
            phone = ?,
            gender = ?,
            birthDate = ?,
            updated_at = NOW()
        WHERE userId = ?
    `;

    db.query(
        sql,
        [
            data.userName || "",
            data.email || "",
            data.phone || "",
            data.gender || null,
            data.birthDate || null,
            id
        ],
        callback
    );
};
const updateAvatar = (id, avatar, callback) => {
    const sql = `UPDATE users SET avatar = ?, updated_at = NOW() WHERE userId = ?`;
    db.query(sql, [avatar, id], callback);
};

module.exports = {
    getAccounts,
    getAccountById,
    createAccount,
    findByPhone,
    saveOtp,
    verifyOtp,
    updateAccount,
    updateAvatar
};