const express = require("express");
const router = express.Router();
const { createPaymentUrl, vnpayCallback } = require("../controllers/vnpayController");

// POST: Frontend gọi để tạo Order + URL thanh toán VNPAY
router.post("/create_payment", createPaymentUrl);

// GET: VNPAY redirect về đây sau khi user thanh toán (BACKEND tự verify)
router.get("/vnpay-callback", vnpayCallback);

module.exports = router;