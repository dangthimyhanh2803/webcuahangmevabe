import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// ==========================================
// CẤU HÌNH ĐƯỜNG DẪN API (DỄ DÀNG THAY ĐỔI)
// ==========================================
// 💡 Mẹo: Nếu đã sửa Backend thành app.use("/api/orders") thì giữ nguyên link này.
// Nếu Backend của bạn đang chạy dạng app.use("/orders"), hãy đổi link thành: "http://localhost:5000/orders"
const ORDER_API_URL = "http://localhost:5000/api/orders";

// ==========================================
// HỆ THỐNG STYLE CHUNG (GIỮ NGUYÊN GIAO DIỆN CỦA BẠN)
// ==========================================
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

// --- STYLE CHO GIAO DIỆN 2 NÚT SAU KHI ĐẶT HÀNG THÀNH CÔNG ---
const successBtnGroupStyle: React.CSSProperties = {
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
    cursor: "pointer",
    transition: "all 0.2s"
};

const btnHistoryStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: "#ff69b4",
    color: "#fff",
    border: "none",
    padding: "12px 15px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s"
};

// ==========================================
// HÀM DÙNG CHUNG: XÓA CÁC SẢN PHẨM ĐÃ MUA KHỎI GIỎ
// ==========================================
const clearPurchasedItems = (checkoutProducts: any[]) => {
    const saved = localStorage.getItem("cart_products");
    if (saved && checkoutProducts && checkoutProducts.length > 0) {
        const currentCart = JSON.parse(saved);
        const checkoutIds = checkoutProducts.map((p: any) => p.id || p.productId);
        const updatedCart = currentCart.filter((p: any) => !checkoutIds.includes(p.id || p.productId));
        localStorage.setItem("cart_products", JSON.stringify(updatedCart));
    }
};

// ==========================================
// 1. COMPONENT XÁC NHẬN THANH TOÁN COD
// ==========================================
export const ConfirmCOD: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => navigate("/"), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userName = currentUser.userName || "Chưa cập nhật";
    const userPhone = currentUser.phone || "Chưa cập nhật";

    const stateData = location.state || {};
    const address = stateData.address || "Chưa xác định địa chỉ";
    const checkoutProducts = stateData.checkoutProducts || [];
    const finalTotal = stateData.finalTotal || 0;

    const finalAmountWithShip = finalTotal + 25000;

    const handleCompleteOrder = async () => {
        setIsSubmitting(true);
        try {
            const items = checkoutProducts.map((p: any) => {
                const targetPrice = p.priceBySize ? (p.priceBySize[p.size] || 0) : (p.price || 0);
                return {
                    productId: p.id || p.productId,
                    quantity: p.quantity || 1,
                    price: targetPrice,
                    size: p.size || "M"
                };
            });

            const orderPayload = {
                userId: currentUser.userId || currentUser.id,
                totalAmount: finalAmountWithShip,
                finalAmount: finalAmountWithShip,
                paymentMethod: "cod",
                items: items
            };

            await axios.post(ORDER_API_URL, orderPayload);

            clearPurchasedItems(checkoutProducts);
            setIsSuccess(true);
        } catch (error: any) {
            console.error("Lỗi đặt hàng COD:", error);
            if (error.response && error.response.status === 404) {
                alert(`Lỗi 404: Không tìm thấy route xử lý trên Server!\nHãy thử kiểm tra file server.js xem có khớp với đường dẫn: ${ORDER_API_URL} không.`);
            } else {
                alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div style={wrapperStyle}>
                <div style={boxStyle}>
                    <div style={{ color: "#52d681", fontSize: "70px", marginBottom: "15px" }}>🎉</div>
                    <h2 style={{ color: "#333", marginBottom: "10px" }}>Đặt hàng thành công!</h2>
                    <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.5" }}>
                        Đơn hàng COD của bạn đã được ghi nhận. Đang chuyển về trang chủ...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{ color: "#ff69b4", fontSize: "60px", marginBottom: "15px" }}>📦</div>
                <h2 style={{ color: "#333", margin: "0 0 10px 0" }}>Xác nhận đặt hàng COD</h2>
                <p style={{ color: "#666", fontSize: "14px" }}>Bạn sẽ thanh toán tiền mặt trực tiếp khi nhận được hàng</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ff69b4", margin: "20px 0" }}>
                    {(finalAmountWithShip || 0).toLocaleString()}đ
                </p>
                <div style={{ textAlign: "left", padding: "15px", backgroundColor: "#fff0f6", borderRadius: "10px", fontSize: "14px", color: "#555", marginBottom: "10px" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Người nhận:</strong> {userName} &nbsp;|&nbsp; {userPhone}</div>
                    <strong>Địa chỉ giao hàng:</strong> <br /> {address}
                </div>
                <button style={btnStyle} disabled={isSubmitting} onClick={handleCompleteOrder}>
                    {isSubmitting ? "Đang xử lý đơn..." : "Xác nhận đặt hàng"}
                </button>
            </div>
        </div>
    );
};

// ==========================================
// 2. COMPONENT XÁC NHẬN THANH TOÁN MOMO
// ==========================================
export const ConfirmMoMo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => navigate("/"), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userName = currentUser.userName || "Chưa cập nhật";
    const userPhone = currentUser.phone || "Chưa cập nhật";

    const stateData = location.state || {};
    const address = stateData.address || "Chưa xác định địa chỉ";
    const checkoutProducts = stateData.checkoutProducts || [];
    const finalTotal = stateData.finalTotal || 0;

    const finalAmountWithShip = finalTotal + 25000;

    const handleConfirmMoMo = async () => {
        setIsSubmitting(true);
        try {
            const items = checkoutProducts.map((p: any) => {
                const targetPrice = p.priceBySize ? (p.priceBySize[p.size] || 0) : (p.price || 0);
                return {
                    productId: p.id || p.productId,
                    quantity: p.quantity || 1,
                    price: targetPrice,
                    size: p.size || "M"
                };
            });

            const orderPayload = {
                userId: currentUser.userId || currentUser.id,
                totalAmount: finalAmountWithShip,
                finalAmount: finalAmountWithShip,
                paymentMethod: "momo",
                items: items
            };

            await axios.post(ORDER_API_URL, orderPayload);
            clearPurchasedItems(checkoutProducts);
            setIsSuccess(true);
        } catch (error: any) {
            console.error("Lỗi đặt hàng MoMo:", error);
            alert("Không kết nối được cổng thanh toán MoMo hoặc sai Route API Backend!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div style={wrapperStyle}>
                <div style={boxStyle}>
                    <div style={{ color: "#52d681", fontSize: "70px", marginBottom: "15px" }}>🎉</div>
                    <h2 style={{ color: "#333", marginBottom: "10px" }}>Thanh toán thành công!</h2>
                    <p style={{ color: "#666", fontSize: "15px" }}>
                        Đơn hàng qua MoMo đã được ghi nhận. Đang chuyển về trang chủ...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{ color: "#a50064", fontSize: "60px", marginBottom: "15px", fontWeight: "bold" }}>M</div>
                <h2 style={{ color: "#a50064", margin: "0 0 10px 0" }}>Cổng thanh toán MoMo</h2>
                <p style={{ color: "#666", fontSize: "14px" }}>Quét mã QR dưới đây để tiến hành chuyển tiền giả lập</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333", margin: "15px 0" }}>
                    {(finalAmountWithShip || 0).toLocaleString()}đ
                </p>
                <div style={{ textAlign: "left", padding: "12px", backgroundColor: "#fdf0f8", borderRadius: "10px", fontSize: "14px", color: "#555", marginBottom: "10px" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Người nhận:</strong> {userName} &nbsp;|&nbsp; {userPhone}</div>
                    <strong>Địa chỉ giao hàng:</strong> <br /> {address}
                </div>
                <div style={{ margin: "20px auto", width: "180px", height: "180px", backgroundColor: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "12px", border: "1px solid #ddd" }}>
                    <span style={{ color: "#999", fontSize: "13px" }}>[Mã QR MoMo Giả Lập]</span>
                </div>
                <button style={{ ...btnStyle, backgroundColor: "#a50064" }} disabled={isSubmitting} onClick={handleConfirmMoMo}>
                    {isSubmitting ? "Đang ghi nhận tiền..." : "Xác nhận đã chuyển khoản thành công"}
                </button>
            </div>
        </div>
    );
};

// ==========================================
// 3. COMPONENT XÁC NHẬN THANH TOÁN VNPAY
// ==========================================
export const ConfirmVNPAY: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => navigate("/"), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userName = currentUser.userName || "Chưa cập nhật";
    const userPhone = currentUser.phone || "Chưa cập nhật";

    const stateData = location.state || {};
    const address = stateData.address || "Chưa xác định địa chỉ";
    const checkoutProducts = stateData.checkoutProducts || [];
    const finalTotal = stateData.finalTotal || 0;

    const finalAmountWithShip = finalTotal + 25000;

    const handleConfirmVNPAY = async () => {
        setIsSubmitting(true);
        try {
            const items = checkoutProducts.map((p: any) => {
                const targetPrice = p.priceBySize ? (p.priceBySize[p.size] || 0) : (p.price || 0);
                return {
                    productId: p.id || p.productId,
                    quantity: p.quantity || 1,
                    price: targetPrice,
                    size: p.size || "M"
                };
            });

            const orderPayload = {
                userId: currentUser.userId || currentUser.id,
                totalAmount: finalAmountWithShip,
                finalAmount: finalAmountWithShip,
                paymentMethod: "vnpay",
                items: items
            };

            await axios.post(ORDER_API_URL, orderPayload);
            clearPurchasedItems(checkoutProducts);
            setIsSuccess(true);
        } catch (error: any) {
            console.error("Lỗi đặt hàng VNPAY:", error);
            alert("Thanh toán qua cổng VNPAY thất bại. Vui lòng kiểm tra cấu hình Endpoint!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div style={wrapperStyle}>
                <div style={boxStyle}>
                    <div style={{ color: "#52d681", fontSize: "70px", marginBottom: "15px" }}>🎉</div>
                    <h2 style={{ color: "#333", marginBottom: "10px" }}>Thanh toán thành công!</h2>
                    <p style={{ color: "#666", fontSize: "15px" }}>
                        Giao dịch qua VNPAY đã hoàn tất. Đang chuyển về trang chủ...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={wrapperStyle}>
            <div style={boxStyle}>
                <div style={{ color: "#005baa", fontSize: "60px", marginBottom: "15px", fontWeight: "bold" }}>💳</div>
                <h2 style={{ color: "#005baa", margin: "0 0 10px 0" }}>Cổng VNPAY</h2>
                <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>Đơn hàng tại: <strong>Green Baby Store</strong></p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333", margin: "15px 0" }}>
                    {(finalAmountWithShip || 0).toLocaleString()} VND
                </p>

                <div style={{ textAlign: "left", padding: "12px", backgroundColor: "#f0f4ff", borderRadius: "10px", fontSize: "14px", color: "#555", margin: "12px 0" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Người nhận:</strong> {userName} &nbsp;|&nbsp; {userPhone}</div>
                    <strong>Địa chỉ giao hàng:</strong> <br /> {address}
                </div>
                <div style={{ textAlign: "left", margin: "12px 0", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e1e4e8" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "13px", color: "#555" }}>Số thẻ test ngân hàng VNPAY:</label>
                    <input type="text" readOnly value="9704 1234 5678 9012" style={{ width: "93%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#fff", fontWeight: "bold", letterSpacing: "1px" }} />
                </div>

                <button
                    style={{ ...btnStyle, backgroundColor: "#005baa" }}
                    disabled={isSubmitting}
                    onClick={handleConfirmVNPAY}
                >
                    {isSubmitting ? "Đang xác thực thẻ..." : "Xác nhận thanh toán"}
                </button>
            </div>
        </div>
    );
};