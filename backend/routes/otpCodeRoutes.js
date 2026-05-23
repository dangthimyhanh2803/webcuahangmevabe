const express = require("express");

const router = express.Router();

const {
    createOtp,
    getOtpByUserId,
    deleteOtp
} = require("../controllers/otpCodeController");

/* CREATE OTP */
router.post("/", createOtp);

/* GET OTP BY USER */
router.get("/:userId", getOtpByUserId);

/* DELETE OTP */
router.delete("/:id", deleteOtp);

module.exports = router;