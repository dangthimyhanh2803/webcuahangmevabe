import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Style bao bọc căn giữa màn hình
const wrapperStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    margin: 0,
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

const btnStyle: React.CSSProperties = {
    backgroundColor: "#ff69b4",
    color: "#fff",
    border: "none",
    padding: "14px 40px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "25px",
    width: "100%",
    transition: "all 0.2s ease"
};

// HÀM CHUNG XỬ LÝ XÓA SẢN PHẨM ĐÃ MUA KHỎI GIỎ HÀNG
const executeClearCart = (purchaseIds: number[]) => {
    const savedCart = localStorage.getItem("cart_products");
    if (savedCart && purchaseIds && purchaseIds.length > 0) {
        const currentProducts = JSON.parse(savedCart);
        // Lọc loại bỏ những sản phẩm có ID nằm trong danh sách vừa thanh toán thành công
        const remainingProducts = currentProducts.filter((p: any) => !purchaseIds.includes(p.id));
        localStorage.setItem("cart_products", JSON.stringify(remainingProducts));
    }
};

// 1. TRANG XÁC NHẬN COD
export const ConfirmCOD: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { finalAmount = 325000, purchaseIds = [] } = (location.state || {}) as any;

    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{ color: "#4caf50", fontSize: "70px", marginBottom: "20px" }}>✓</div>
                <h2 style={{ color: "#333", margin: "0 0 10px 0" }}>Xác nhận đơn hàng COD</h2>
                <p style={{ color: "#666", lineHeight: "1.6", fontSize: "15px" }}>
                    Quý khách đã chọn hình thức thanh toán bằng tiền mặt khi nhận hàng.
                    Vui lòng chuẩn bị sẵn số tiền <strong style={{ color: "#ff69b4" }}>{finalAmount.toLocaleString()}đ</strong> khi nhân viên bưu tá liên hệ giao hàng.
                </p>
                <button style={btnStyle} onClick={() => {
                    executeClearCart(purchaseIds); // Xóa sản phẩm khỏi giỏ hàng
                    alert("🎉 Đặt hàng thành công! Các sản phẩm đã thanh toán đã được dọn sạch khỏi giỏ hàng.");
                    navigate("/cart");
                }}>
                    Hoàn thành đặt hàng
                </button>
            </div>
        </div>
    );
};

// 2. TRANG XÁC NHẬN MOMO
export const ConfirmMoMo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { finalAmount = 325000, purchaseIds = [] } = (location.state || {}) as any;

    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{ backgroundColor: "#a50064", width: "70px", height: "70px", borderRadius: "16px", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: "35px", fontWeight: "bold" }}>M</span>
                </div>
                <h2 style={{ color: "#a50064", margin: "0 0 10px 0" }}>Cổng thanh toán MoMo</h2>
                <p style={{ color: "#666", fontSize: "15px" }}>Số tiền thanh toán: <strong>{finalAmount.toLocaleString()}đ</strong></p>
                <div style={{ border: "2px dashed #e1e4e8", padding: "20px", margin: "20px 0", borderRadius: "12px", backgroundColor: "#fafafa" }}>
                    <div style={{ fontSize: "80px", color: "#333", lineHeight: 1 }}>📱</div>
                    <p style={{ fontSize: "13px", color: "#888", marginTop: "10px", margin: "10px 0 0 0" }}>Vui lòng mở ứng dụng ví MoMo quét mã QR để quét và hoàn tất giao dịch.</p>
                </div>
                <button style={{ ...btnStyle, backgroundColor: "#a50064" }} onClick={() => {
                    executeClearCart(purchaseIds); // Xóa sản phẩm khỏi giỏ hàng
                    alert("🎉 Thanh toán trực tuyến qua MoMo thành công! Giỏ hàng đã cập nhật.");
                    navigate("/cart");
                }}>
                    Xác nhận đã chuyển tiền
                </button>
            </div>
        </div>
    );
};

// 3. TRANG XÁC NHẬN VNPAY
export const ConfirmVNPAY: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { finalAmount = 325000, purchaseIds = [] } = (location.state || {}) as any;

    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{ color: "#005baa", fontSize: "60px", marginBottom: "15px", fontWeight: "bold" }}>💳</div>
                <h2 style={{ color: "#005baa", margin: "0 0 10px 0" }}>Cổng VNPAY</h2>
                <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>Đơn hàng tại: <strong>Green Baby Store</strong></p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333", margin: "15px 0" }}>{finalAmount.toLocaleString()} VND</p>

                <div style={{ textAlign: "left", margin: "20px 0", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e1e4e8" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "13px", color: "#555" }}>Số thẻ test ngân hàng:</label>
                    <input type="text" readOnly value="9704 1234 5678 9012" style={{ width: "93%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#fff", fontWeight: "bold", letterSpacing: "1px" }} />
                </div>

                <button style={{ ...btnStyle, backgroundColor: "#005baa" }} onClick={() => {
                    executeClearCart(purchaseIds); // Xóa sản phẩm khỏi giỏ hàng
                    alert("🎉 Thanh toán hóa đơn qua VNPAY thành công! Giỏ hàng đã làm sạch.");
                    navigate("/cart");
                }}>
                    Xác nhận thanh toán
                </button>
            </div>
        </div>
    );
};