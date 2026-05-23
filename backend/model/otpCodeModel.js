const db = require("../config/db");

/* CREATE OTP */
const createOtp = (data, callback) => {

    const sql = `
        INSERT INTO otp_codes
        (
            userId,
            otp,
            expired_at
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.userId,
            data.otp,
            data.expired_at
        ],
        callback
    );
};

/* GET OTP BY USER */
const getOtpByUserId = (userId, callback) => {

    const sql = `
        SELECT * FROM otp_codes
        WHERE userId = ?
        ORDER BY created_at DESC
        LIMIT 1
    `;

    db.query(sql, [userId], callback);
};

/* DELETE OTP */
const deleteOtp = (id, callback) => {

    const sql = `
        DELETE FROM otp_codes
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    createOtp,
    getOtpByUserId,
    deleteOtp
};