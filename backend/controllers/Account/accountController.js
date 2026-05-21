const Account = require("../../model/accountModel");
const bcrypt = require("bcrypt");
/* GET ALL */
const getAccounts = (req, res) => {

    Account.getAccounts((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getAccountById = (req, res) => {
    const id = req.params.id;
    Account.getAccountById(id, (err, result) => {
        if (err) return res.status(500).json(err);

        // ✅ Thêm kiểm tra
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        res.json(result[0]);
    });
};

/* CREATE */
const createAccount = (req, res) => {

    Account.createAccount(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Tạo tài khoản thành công"
        });
    });
};
const updateAccount = (req, res) => {

    const id = req.params.id;

    Account.updateAccount(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        // trả về user mới sau khi update
        Account.getAccountById(id, (err2, data) => {

            if (err2) {
                return res.status(500).json(err2);
            }

            res.json(data[0]);
        });
    });
};
const uploadAvatar = (req, res) => {
    const id = req.params.id;
    const { avatar } = req.body;

    if (!avatar) {
        return res.status(400).json({ message: "Không có dữ liệu ảnh" });
    }

    Account.updateAvatar(id, avatar, (err) => {
        if (err) return res.status(500).json(err);

        Account.getAccountById(id, (err2, data) => {
            if (err2) return res.status(500).json(err2);
            res.json(data[0]);
        });
    });
};

module.exports = {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    uploadAvatar
};