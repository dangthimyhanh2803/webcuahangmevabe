const Account =
    require("../../model/accountModel");
const checkPhone = (req, res) => {

    const { phone } = req.body;

    Account.findByPhone(phone, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        // đã tồn tại
        if (result.length > 0) {

            return res.json({
                exists: true
            });
        }

        // chưa tồn tại
        return res.json({
            exists: false
        });
    });
};
module.exports = checkPhone;