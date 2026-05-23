const Address = require("../model/addressModel");

const addAddress = (req, res) => {
    Address.createAddress(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Thêm địa chỉ thành công", addressId: result.insertId });
    });
};

const getAddresses = (req, res) => {
    Address.getAddresses((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

const getAddressesByUserId = (req, res) => {
    const userId = req.params.userId;
    Address.getAddressesByUserId(userId, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

const updateAddress = (req, res) => {
    const addressId = req.params.addressId;
    Address.updateAddress(addressId, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cập nhật địa chỉ thành công" });
    });
};

const setDefaultAddress = (req, res) => {
    const { addressId } = req.params;
    const { userId } = req.body;
    Address.setDefaultAddress(addressId, userId, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Đặt địa chỉ mặc định thành công" });
    });
};

const deleteAddress = (req, res) => {
    const { addressId } = req.params;
    const { userId } = req.body;
    Address.deleteAddress(addressId, userId, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Xóa địa chỉ thành công" });
    });
};

module.exports = {
    addAddress,
    getAddresses,
    getAddressesByUserId,
    updateAddress,
    setDefaultAddress,
    deleteAddress
};