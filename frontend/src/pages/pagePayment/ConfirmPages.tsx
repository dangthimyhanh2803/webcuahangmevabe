import React from "react";
import { useNavigate } from "react-router-dom";

// Kiểu CSS chung cho hộp giao diện
const boxStyle: React.CSSProperties = {
    maxWidth: "500px",
    margin: "80px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
};

const btnStyle: React.CSSProperties = {
    backgroundColor: "#ff69b4",
    color: "#fff",
    border: "none",
    padding: "12px 30px",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 3px 6px rgba(255, 105, 180, 0.3)"
};

// 1. GIAO DIỆN XÁC NHẬN TIỀN MẶT (COD)
export const ConfirmCOD: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={boxStyle}>
            <i className="fa-solid fa-money-bill-wave" style={{ fontSize: "60px", color: "#4caf50", marginBottom: "15px" }}></i>
            <h2 style={{ color: "#333" }}>Xác nhận đơn hàng COD</h2>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
                Quý khách đã chọn hình thức thanh toán bằng tiền mặt khi nhận hàng.
                Vui lòng chuẩn bị sẵn số tiền <strong>315.000đ</strong> khi shipper liên hệ giao hàng.
            </p>
            <button style={btnStyle} onClick={() => {
                alert("Đặt hàng thành công!");
                navigate("/");
            }}>
                Hoàn thành đặt hàng
            </button>
        </div>
    );
};

// 2. GIAO DIỆN MÔ PHỎNG CỔNG THANH TOÁN MOMO
export const ConfirmMoMo: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={boxStyle}>
            <div style={{ backgroundColor: "#a50064", width: "70px", height: "70px", borderRadius: "12px", margin: "0 auto 15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="fa-solid fa-wallet" style={{ fontSize: "40px", color: "#fff" }}></i>
            </div>
            <h2 style={{ color: "#a50064" }}>Cổng thanh toán MoMo</h2>
            <p style={{ color: "#666" }}>Số tiền cần thanh toán: <strong>315.000đ</strong></p>
            <div style={{ border: "2px dashed #ccc", padding: "20px", margin: "15px 0", borderRadius: "8px", backgroundColor: "#fafafa" }}>
                <i className="fa-solid fa-qrcode" style={{ fontSize: "100px", color: "#333" }}></i>
                <p style={{ fontSize: "13px", color: "#888", marginTop: "10px" }}>Quét mã QR bằng ứng dụng MoMo để hoàn tất thanh toán</p>
            </div>
            <button style={{ ...btnStyle, backgroundColor: "#a50064", boxShadow: "0 3px 6px rgba(165, 0, 100, 0.3)" }} onClick={() => {
                alert("Thanh toán qua MoMo thành công!");
                navigate("/");
            }}>
                Xác nhận đã thanh toán
            </button>
        </div>
    );
};

// 3. GIAO DIỆN MÔ PHỎNG CỔNG VNPAY
export const ConfirmVNPAY: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={boxStyle}>
            <i className="fa-solid fa-credit-card" style={{ fontSize: "60px", color: "#005baa", marginBottom: "15px" }}></i>
            <h2 style={{ color: "#005baa" }}>Cổng thanh toán điện tử VNPAY</h2>
            <p style={{ color: "#666" }}>Đơn hàng từ: <strong>Green Baby Store</strong></p>
            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ff1493" }}>315.000 VND</p>

            <div style={{ textAlign: "left", margin: "20px 0", padding: "15px", backgroundColor: "#f0f4f8", borderRadius: "8px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px" }}>Số thẻ ngân hàng:</label>
                <input type="text" placeholder="9704 1234 5678 9012" defaultValue="9704123456789012" style={{ width: "93%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            <button style={{ ...btnStyle, backgroundColor: "#005baa", boxShadow: "0 3px 6px rgba(0, 91, 170, 0.3)" }} onClick={() => {
                alert("Thanh toán qua VNPAY thành công!");
                navigate("/");
            }}>
                Xác nhận thanh toán điện tử
            </button>
        </div>
    );
};