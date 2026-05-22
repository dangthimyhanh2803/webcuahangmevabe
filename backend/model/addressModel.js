const db = require("../config/db");

const SEL = "SELECT addressId, userId, fullName, phone, province, district, detailAddress, note, isDefault FROM addresses";

const createAddress = (data, callback) => {
    const sql = `
        INSERT INTO addresses (userId, fullName, phone, province, district, detailAddress, note, isDefault)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [data.userId, data.fullName, data.phone, data.province, data.district, data.detailAddress, data.note, data.isDefault || 0], callback);
};

const getAddresses = (callback) => {
    db.query(SEL, callback);
};

const getAddressesByUserId = (userId, callback) => {
    db.query(`${SEL} WHERE userId = ? ORDER BY isDefault DESC`, [userId], callback);
};

const updateAddress = (addressId, data, callback) => {
    const sql = `
        UPDATE addresses
        SET fullName = ?, phone = ?, province = ?, district = ?, detailAddress = ?, note = ?
        WHERE addressId = ?
    `;
    db.query(sql, [data.fullName, data.phone, data.province, data.district, data.detailAddress, data.note, addressId], callback);
};

const setDefaultAddress = (addressId, userId, callback) => {
    db.query("UPDATE addresses SET isDefault = 0 WHERE userId = ?", [userId], (err) => {
        if (err) return callback(err);
        db.query("UPDATE addresses SET isDefault = 1 WHERE addressId = ? AND userId = ?", [addressId, userId], callback);
    });
};

const deleteAddress = (addressId, userId, callback) => {
    db.query("DELETE FROM addresses WHERE addressId = ? AND userId = ?", [addressId, userId], callback);
};

module.exports = {
    createAddress,
    getAddresses,
    getAddressesByUserId,
    updateAddress,
    setDefaultAddress,
    deleteAddress
};