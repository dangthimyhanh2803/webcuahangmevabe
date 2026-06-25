const Account = require("../model/accountModel");

const requireVerified = (req, res, next) => {

    const userId = req.body.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Bạn cần đăng nhập để thực hiện thao tác này"
        });
    }

    Account.getAccountById(userId, (err, result) => {

        if (err || !result || result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Tài khoản không tồn tại"
            });
        }

        const user = result[0];

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Tài khoản chưa được kích hoạt. Vui lòng hoàn tất đăng ký."
            });
        }

        next();
    });
};

module.exports = requireVerified;