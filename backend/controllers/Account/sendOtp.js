const Account =
    require("../../model/accountModel");

const sendOtp = (req, res) => {

    const { phone } = req.body;

    // fake OTP
    const otp = "123456";

    // hết hạn sau 5 phút
    const expiredAt =
        new Date(
            Date.now() + 5 * 60 * 1000
        );

    Account.saveOtp(
        phone,
        otp,
        expiredAt,
        (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            console.log(
                `OTP của ${phone}: ${otp}`
            );

            res.json({
                message: "Đã gửi OTP"
            });
        }
    );
};

module.exports = sendOtp;