const bcrypt =
    require("bcrypt");

const Account =
    require("../../model/accountModel");

const register =
    async (req, res) => {

        try {

            const {
                userName,
                email,
                password,
                phone
            } = req.body;

            // hash password
            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            Account.createAccount(
                {
                    userName,
                    email,
                    password:
                    hashedPassword,
                    phone
                },

                (err, result) => {

                    if (err) {

                        return res
                            .status(500)
                            .json(err);
                    }

                    res.json({

                        success: true,

                        message:
                            "Đăng ký thành công"
                    });
                }
            );

        } catch (error) {

            res.status(500).json({
                success: false,
                error
            });
        }
    };

module.exports = register;