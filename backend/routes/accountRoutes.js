const express = require("express");

const router = express.Router();

const {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    uploadAvatar
} = require("../controllers/Account/accountController");
const checkPhone =
    require("../controllers/Account/checkPhone");
const login =
    require("../controllers/Account/login");
const register =
    require("../controllers/Account/register");
const sendOtp =
    require("../controllers/Account/sendOtp");
const verifyOtp =
    require("../controllers/Account/verifyOtp");
/* CREATE */
router.post("/", createAccount);
router.post("/check-phone", checkPhone);
router.post("/login", login);
router.post("/register", register);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
/* GET ALL */
router.get("/", getAccounts);
/*UPDATE*/
router.put("/:id", updateAccount);
router.put("/:id/avatar", uploadAvatar);


/* GET BY ID */
router.get("/:id", getAccountById);



module.exports = router;