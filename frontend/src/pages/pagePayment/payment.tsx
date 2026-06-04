import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./payment.css";
import map from "../../assets/icons/icondiachi.png";
import voucher from "../../assets/header/voucher.svg";
import sanpham from "../../assets/icons/Sanpham.png";

interface CheckoutProduct {
    id: number;
    name: string;
    priceBySize: { [key: string]: number };
    image: string;
    quantity: number;
    size: "S" | "M" | "L";
}

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentMethod, setPaymentMethod] = useState<string>("cod");

    // Thêm state để lưu thông tin người nhận
    const [userInfo, setUserInfo] = useState({ name: "", phone: "" });

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            setUserInfo({
                name: user.userName || "Chưa cập nhật",
                phone: user.phone || "Chưa cập nhật"
            });
        }
    }, []);

    // Lấy dữ liệu an toàn từ location.state
    const {
        address = "Chưa có địa chỉ",
        checkoutProducts = [],
        temporaryTotal = 0,
        discountAmount = 0,
        finalTotal = 0
    } = (location.state || {}) as {
        address?: string;
        checkoutProducts?: CheckoutProduct[];
        temporaryTotal?: number;
        discountAmount?: number;
        finalTotal?: number;
    };

    // KIỂM TRA PHÒNG NGỪA: Nếu giỏ hàng trống, chặn không cho thanh toán
    useEffect(() => {
        if (checkoutProducts.length === 0) {
            alert("Giỏ hàng thanh toán của bạn đang trống! Vui lòng chọn sản phẩm trước.");
            navigate("/cart");
        }
    }, [checkoutProducts, navigate]);

    const handleBackToCart = () => {
        navigate("/cart");
    };

    const handleConfirmPayment = () => {
        const passState = {
            checkoutProducts: checkoutProducts,
            temporaryTotal: temporaryTotal,
            discountAmount: discountAmount,
            finalTotal: finalTotal,
        };

        if (paymentMethod === "cod") {
            navigate("/payment/confirm-cod", { state: passState });
        } else if (paymentMethod === "momo") {
            navigate("/payment/confirm-momo", { state: passState });
        } else if (paymentMethod === "vnpay") {
            navigate("/payment/confirm-vnpay", { state: passState });
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-body-page">

                {/* ADDRESS */}
                <div className="payment-address">
                    <div className="payment-title"><span>Địa chỉ nhận hàng</span></div>
                    <div className="payment-container-address">
                        <div className="payment-icon">
                            <img src={map} alt="map" className="promo-map" />
                        </div>
                        <div className="payment-info-user">
                            <div className="payment-name-phone">
                                {/* Dùng state thay vì hardcode */}
                                <span className="payment-name">{userInfo.name}</span>
                                <span className="payment-phone">{userInfo.phone}</span>
                            </div>
                            <div className="payment-address-detail">
                                <p>{address}</p>
                            </div>
                        </div>
                        <div className="payment-btn-change-address">
                            <button onClick={handleBackToCart} title="Quay lại sửa địa chỉ">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* PRODUCT ORDER */}
                <div className="payment-product-order">
                    <div className="payment-order-header">
                        <span className="payment-col-sp">Sản phẩm</span>
                        <span>Size</span>
                        <span>Số lượng</span>
                        <span>Đơn giá</span>
                        <span>Thành tiền</span>
                    </div>
                    <div className="payment-container-product">
                        {checkoutProducts.map((product) => {
                            const unitPrice = product.priceBySize[product.size];
                            return (
                                <div className="payment-product-card" key={`${product.id}-${product.size}`}>
                                    <div className="payment-product-info">
                                        {/* Sửa lỗi hiển thị ảnh sản phẩm */}
                                        <img
                                            src={product.image.startsWith("http") ? product.image : `http://localhost:5000/image/${product.image}`}
                                            alt={product.name} onError={(e) => {

                                            (e.target as HTMLImageElement).src = sanpham; // Ảnh dự phòng nếu lỗi link đường dẫn tĩnh

                                        }}/>
                                        <span className="payment-name-sp">{product.name}</span>
                                    </div>
                                    <div className="payment-type-sp">Size {product.size}</div>
                                    <div className="payment-qty-sp">{product.quantity}</div>
                                    <div className="payment-price-sp">{unitPrice.toLocaleString()}đ</div>
                                    <div className="payment-total-sp">{(unitPrice * product.quantity).toLocaleString()}đ</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* SHIPPING */}
                <div className="payment-ship-type">
                    <div className="payment-title">
                        <span>Phương thức vận chuyển</span>
                    </div>
                    <div className="payment-container-ship">
                        <div className="payment-ship-info">
                            <i className="fa-solid fa-truck-fast payment-icon-ship"></i>
                            <div className="payment-ship-text">
                                <strong>Giao hàng nhanh tiết kiệm</strong>
                                <p>Nhận hàng trong ngày (Dự kiến trước 18h)</p>
                            </div>
                            <div className="payment-ship-price">25.000đ</div>
                        </div>
                    </div>
                </div>

                {/* METHOD PAYMENT */}
                <div className="payment-method-section" style={{ marginTop: "20px" }}>
                    <div className="payment-title"><span>Phương thức thanh toán</span></div>
                    <div className="payment-container-method" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", marginTop: "10px" }}>
                        <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
                            <input
                                type="radio"
                                id="method_cod"
                                name="payment_choice"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                                style={{ width: "18px", height: "18px", marginRight: "12px", accentColor: "#ff69b4", cursor: "pointer" }}
                            />
                            <label htmlFor="method_cod" style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "15px" }}>
                                <i className="fa-solid fa-money-bill-wave" style={{ color: "#4caf50", marginRight: "10px" }}></i>
                                Thanh toán tiền mặt khi nhận hàng (COD)
                            </label>
                        </div>
                        {/*<div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>*/}
                        {/*    <input*/}
                        {/*        type="radio"*/}
                        {/*        id="method_momo"*/}
                        {/*        name="payment_choice"*/}
                        {/*        value="momo"*/}
                        {/*        checked={paymentMethod === "momo"}*/}
                        {/*        onChange={() => setPaymentMethod("momo")}*/}
                        {/*        style={{ width: "18px", height: "18px", marginRight: "12px", accentColor: "#ff69b4", cursor: "pointer" }}*/}
                        {/*    />*/}
                        {/*    <label htmlFor="method_momo" style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "15px" }}>*/}
                        {/*        <i className="fa-solid fa-wallet" style={{ color: "#a50064", marginRight: "10px" }}></i>*/}
                        {/*        Thanh toán trực tuyến qua Ví điện tử MoMo*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="radio"
                                id="method_vnpay"
                                name="payment_choice"
                                value="vnpay"
                                checked={paymentMethod === "vnpay"}
                                onChange={() => setPaymentMethod("vnpay")}
                                style={{ width: "18px", height: "18px", marginRight: "12px", accentColor: "#ff69b4", cursor: "pointer" }}
                            />
                            <label htmlFor="method_vnpay" style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "15px" }}>
                                <i className="fa-solid fa-credit-card" style={{ color: "#005baa", marginRight: "10px" }}></i>
                                Thanh toán trực tuyến qua Cổng VNPAY (ATM / Visa / QR Code)
                            </label>
                        </div>
                    </div>
                </div>

                {/* SUMMARY */}
                <div className="payment-section" style={{ marginTop: "20px" }}>
                    <div className="payment-voucher-box">
                        <img src={voucher} alt="voucher" />
                        <span>Mã giảm giá:</span>
                        <input type="text" placeholder="Nhập mã voucher..." />
                        <button className="payment-btn-apply">Áp dụng</button>
                    </div>

                    <div className="payment-total-summary">
                        <div className="payment-row"><span>Tiền hàng:</span><span>{temporaryTotal.toLocaleString()}đ</span></div>
                        <div className="payment-row"><span>Phí ship:</span><span>25.000đ</span></div>
                        <div className="payment-row"><span>Giảm giá:</span><span className="payment-minus">-{discountAmount.toLocaleString()}đ</span></div>
                        <div className="payment-row payment-final">
                            <strong>Tổng thanh toán:</strong>
                            <strong className="payment-pink-text">{(finalTotal + 25000).toLocaleString()}đ</strong>
                        </div>
                    </div>

                    <div className="payment-btn-group">
                        <button className="payment-btn-back" onClick={handleBackToCart}>Quay lại giỏ hàng</button>
                        <button className="payment-btn-confirm" onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;