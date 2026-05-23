const bcrypt =
    require("bcrypt");

const Account =
    require("../../model/accountModel");

const login = (req, res) => {

    const {
        phone,
        password
    } = req.body;

    Account.findByPhone(

        phone,

        async (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            // không tìm thấy
            if (result.length === 0) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            "Tài khoản không tồn tại"
                    });
            }

            const user =
                result[0];

            // compare password
            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            // sai password
            if (!isMatch) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            "Sai mật khẩu"
                    });
            }

            // login thành công
            res.json({

                success: true,

                message:
                    "Đăng nhập thành công",

                user: {

                    userId:
                    user.userId,

                    userName:
                    user.userName,

                    email:
                    user.email,

                    phone:
                    user.phone,

                    role:
                    user.role
                }
            });
        }
    );
};

module.exports = login;