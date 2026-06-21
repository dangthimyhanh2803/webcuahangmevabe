const crypto = require("crypto");
const db = require("../config/db");

// ============================
// CẤU HÌNH VNPAY SANDBOX THẬT
// ============================
const VNPAY_CONFIG = {
    tmnCode: "0DPLTJ4H",
    hashSecret: "XBFD5YMLWYSJGL87Y6VA9SP17SRA1DE7",
    paymentUrl: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    // Sau khi thanh toán xong, VNPAY sẽ điều hướng người dùng về trang Return này của Frontend React
    returnUrl: "http://localhost:3000/payment/vnpay-return",
    version: "2.1.0",
    command: "pay",
    orderType: "other",
    locale: "vn",
    currencyCode: "VND",
};

// ============================
// HÀM TIỆN ÍCH
// ============================
function sortObject(obj) {
    const sorted = {};
    Object.keys(obj).sort().forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
}

function formatDate(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return (
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
    );
}

function hmacSHA512(key, data) {
    return crypto.createHmac("sha512", key).update(Buffer.from(data, "utf-8")).digest("hex");
}

// ============================
// TẠO ĐƠN HÀNG PENDING + URL THANH TOÁN VNPAY THẬT
// POST /api/vnpay/create_payment
// ============================
const createPaymentUrl = async (req, res) => {
    try {
        const { userId, addressId, items, totalAmount, finalAmount } = req.body;

        // 1. Tạo đơn hàng trong DB với trạng thái ban đầu = "Pending"
        const [orderResult] = await db.promise().query(
            `INSERT INTO orders (userId, addressId, totalAmount, finalAmount, paymentMethod, status)
             VALUES (?, ?, ?, ?, 'VNPAY', 'Pending')`,
            [userId, addressId, totalAmount, finalAmount]
        );
        const orderId = orderResult.insertId;

        // 2. Lưu chi tiết sản phẩm vào bảng orderdetails
        for (const item of items) {
            await db.promise().query(
                `INSERT INTO orderdetails (orderId, productId, quantity, price, size)
                 VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.productId, item.quantity, item.price, item.size]
            );
        }

        // 3. Thiết lập bộ tham số gửi sang VNPAY
        const vnp_TxnRef = String(orderId);
        const amount = Math.round(finalAmount * 100); // VNPAY yêu cầu nhân 100 số tiền thực tế

        const now = new Date();
        const vnp_CreateDate = formatDate(now);
        const expireDate = new Date(now.getTime() + 15 * 60 * 1000); // Hết hạn sau 15 phút
        const vnp_ExpireDate = formatDate(expireDate);

        const vnpParams = {
            vnp_Version: VNPAY_CONFIG.version,
            vnp_Command: VNPAY_CONFIG.command,
            vnp_TmnCode: VNPAY_CONFIG.tmnCode,
            vnp_Amount: String(amount),
            vnp_CurrCode: VNPAY_CONFIG.currencyCode,
            vnp_TxnRef: vnp_TxnRef,
            vnp_OrderInfo: `Thanh toan don hang:${vnp_TxnRef}`,
            vnp_OrderType: VNPAY_CONFIG.orderType,
            vnp_Locale: VNPAY_CONFIG.locale,
            vnp_ReturnUrl: VNPAY_CONFIG.returnUrl,
            vnp_IpAddr: req.ip || "127.0.0.1",
            vnp_CreateDate: vnp_CreateDate,
            vnp_ExpireDate: vnp_ExpireDate,
            vnp_BankCode: "NCB", // Ngân hàng mặc định môi trường Sandbox
        };

        const sortedParams = sortObject(vnpParams);
        const signData = new URLSearchParams(sortedParams).toString();
        const secureHash = hmacSHA512(VNPAY_CONFIG.hashSecret, signData);

        const paymentUrl = VNPAY_CONFIG.paymentUrl + "?" + signData + "&vnp_SecureHash=" + secureHash;

        // Trả link thanh toán thực về cho Frontend chuyển hướng
        res.json({ success: true, paymentUrl, orderId });
    } catch (error) {
        console.error("Lỗi tạo URL VNPAY:", error);
        res.status(500).json({ success: false, message: "Không thể tạo URL thanh toán" });
    }
};

// ============================
// FRONTEND GỌI ĐỂ XÁC THỰC CHỮ KÝ VÀ CẬP NHẬT TRẠNG THÁI GIAO DỊCH
// GET /api/vnpay/vnpay-callback
// ============================
const vnpayCallback = async (req, res) => {
    try {
        const vnpParams = { ...req.query };
        const secureHash = vnpParams["vnp_SecureHash"];
        delete vnpParams["vnp_SecureHash"];
        delete vnpParams["vnp_SecureHashType"];

        const sortedParams = sortObject(vnpParams);
        const signData = new URLSearchParams(sortedParams).toString();
        const checkHash = hmacSHA512(VNPAY_CONFIG.hashSecret, signData);

        const orderId = vnpParams["vnp_TxnRef"];
        const responseCode = vnpParams["vnp_ResponseCode"];
        const transactionNo = vnpParams["vnp_TransactionNo"] || "";

        // FRONTEND_URL của bạn đang cấu hình là "http://localhost:3000"
        if (secureHash !== checkHash) {
            console.error("Chữ ký VNPay không hợp lệ!");
            // Nếu sai chữ ký bảo mật, lập tức đẩy về trang kết quả với mã lỗi ẩn định (99)
            return res.redirect(`${FRONTEND_URL}/payment/vnpay-return?vnp_ResponseCode=99&vnp_TxnRef=${orderId}`);
        }

        if (responseCode === "00") {
            // ✅ Thanh toán thành công -> Cập nhật trạng thái sang Confirmed
            await db.promise().query(
                `UPDATE orders SET status = 'Confirmed', transactionId = ? WHERE orderId = ?`,
                [transactionNo, orderId]
            );
        } else {
            // ❌ Thất bại hoặc Khách hàng hủy -> Cập nhật trạng thái sang Cancelled
            await db.promise().query(
                `UPDATE orders SET status = 'Cancelled' WHERE orderId = ?`,
                [orderId]
            );
        }

        // ============================================================
        // THAY ĐỔI QUAN TRỌNG NHẤT: Điều hướng trình duyệt quay lại Frontend React
        // Bắn kèm các tham số vnp_ResponseCode và vnp_TxnRef lên URL để React đọc dữ liệu
        // ============================================================
        return res.redirect(`${FRONTEND_URL}/payment/vnpay-return?vnp_ResponseCode=${responseCode}&vnp_TxnRef=${orderId}`);

    } catch (error) {
        console.error("Lỗi callback VNPAY:", error);
        // Nếu sập hệ thống Backend, đẩy sang trang kết quả báo lỗi thất bại
        return res.redirect(`${FRONTEND_URL}/payment/vnpay-return?vnp_ResponseCode=99`);
    }
};

module.exports = { createPaymentUrl, vnpayCallback };