const OtpCode = require("../model/otpCodeModel");

/* CREATE OTP */
const createOtp = (req, res) => {

    OtpCode.createOtp(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Tạo OTP thành công"
        });
    });
};

/* GET OTP */
const getOtpByUserId = (req, res) => {

    const userId = req.params.userId;

    OtpCode.getOtpByUserId(userId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* DELETE OTP */
const deleteOtp = (req, res) => {

    const id = req.params.id;

    OtpCode.deleteOtp(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa OTP thành công"
        });
    });
};

module.exports = {
    createOtp,
    getOtpByUserId,
    deleteOtp
};