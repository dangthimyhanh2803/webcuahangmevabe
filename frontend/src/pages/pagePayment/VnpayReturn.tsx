import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// ==========================================
// ĐỊNH NGHĨA CÁC STYLE ĐỒNG BỘ THEO TONE MÀU SHOP
// ==========================================
const wrapperStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    padding: "20px"
};

const boxStyle: React.CSSProperties = {
    maxWidth: "480px",
    width: "100%",
    padding: "40px 30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
};

const btnGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
    width: "100%"
};

const btnHomeStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: "#fff",
    color: "#ff69b4",
    border: "2px solid #ff69b4",
    padding: "12px 15px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer"
};

const btnPrimaryStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: "#ff69b4",
    color: "#fff",
    border: "none",
    padding: "12px 15px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer"
};

const VnpayReturn: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Đọc thẳng mã trạng thái từ thanh địa chỉ URL do Backend đẩy về
    const responseCode = searchParams.get("vnp_ResponseCode");
    const orderId = searchParams.get("vnp_TxnRef");

    useEffect(() => {
        // Nếu thành công (mã 00), tự động xóa giỏ hàng
        if (responseCode === "00") {
            localStorage.removeItem("cart");
        }
    }, [responseCode]);

    // 1. Giao diện THANH TOÁN THÀNH CÔNG (Mã 00)
    if (responseCode === "00") {
        return (
            <div style={wrapperStyle}>
                <div style={boxStyle}>
                    <div style={{
                        width: "80px", height: "80px", borderRadius: "50%",
                        backgroundColor: "#e8f5e9", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        margin: "0 auto 20px auto"
                    }}>
                        <span style={{ fontSize: "40px", color: "#4caf50" }}>✓</span>
                    </div>

                    <h2 style={{ color: "#333", marginBottom: "10px" }}>Thanh toán thành công!</h2>
                    <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.5" }}>
                        Cảm ơn bạn đã mua sắm tại cửa hàng. Đơn hàng của bạn đã được hoàn tất thanh toán an toàn qua cổng VNPay.
                    </p>

                    {orderId && (
                        <p style={{ color: "#ff69b4", fontWeight: "bold", fontSize: "16px", marginTop: "10px" }}>
                            Mã đơn hàng: #{orderId}
                        </p>
                    )}

                    {/* Bổ sung cụm 2 nút bấm ngang nhau */}
                    <div style={btnGroupStyle}>
                        <button style={btnHomeStyle} onClick={() => navigate("/")}>
                            Về trang chủ
                        </button>
                        <button
                            style={btnPrimaryStyle}
                            onClick={() => navigate("/history")} // Sửa đường dẫn lịch sử đơn hàng cho đúng với dự án của bạn
                        >
                            Xem đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Giao diện THANH TOÁN THẤT BẠI HOẶC HỦY
    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    backgroundColor: "#ffebee", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px auto"
                }}>
                    <span style={{ fontSize: "40px", color: "#f44336" }}>✕</span>
                </div>

                <h2 style={{ color: "#333", marginBottom: "10px" }}>Thanh toán thất bại</h2>
                <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.5" }}>
                    Giao dịch qua VNPay chưa hoàn tất thành công hoặc đã bị khách hàng hủy bỏ giữa chừng.
                </p>

                {orderId && (
                    <p style={{ color: "#999", fontSize: "14px", marginTop: "10px" }}>
                        Mã đơn: #{orderId}
                    </p>
                )}

                <div style={btnGroupStyle}>
                    <button style={btnHomeStyle} onClick={() => navigate("/")}>
                        Về trang chủ
                    </button>
                    <button style={btnPrimaryStyle} onClick={() => navigate("/cart")}>
                        Quay lại giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VnpayReturn;