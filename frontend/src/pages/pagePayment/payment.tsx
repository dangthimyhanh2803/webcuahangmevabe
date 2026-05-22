import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";
import map from "../../assets/icons/icondiachi.png";
import sanpham from "../../assets/icons/Sanpham.png";
import voucher from "../../assets/header/voucher.svg";

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<string>("cod");

    const handleBackToCart = () => {
        navigate("/cart");
    };

    // Điều hướng sang trang trung gian tùy theo phương thức được chọn
    const handleConfirmPayment = () => {
        if (paymentMethod === "cod") {
            navigate("/payment/confirm-cod");
        } else if (paymentMethod === "momo") {
            navigate("/payment/confirm-momo");
        } else if (paymentMethod === "vnpay") {
            navigate("/payment/confirm-vnpay");
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-body-page">
                {/* ADDRESS */}
                <div className="payment-address">
                    <div className="payment-title"><span>Địa chỉ nhận hàng</span></div>
                    <div className="payment-container-address">
                        <div className="payment-icon"><img src={map} alt="map" className="promo-map" /></div>
                        <div className="payment-info-user">
                            <div className="payment-name-phone">
                                <span className="payment-name">Lý Thái Minh Khang</span>
                                <span className="payment-phone">0123456789</span>
                            </div>
                            <div className="payment-address-detail">
                                <p>Trần Nguyên Hãn, Phường Dĩ An, Tp.Dĩ An, Tỉnh Bình Dương</p>
                            </div>
                        </div>
                        <div className="payment-btn-change-address">
                            <button><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                {/* PRODUCT ORDER */}
                <div className="payment-product-order">
                    <div className="payment-order-header">
                        <span className="payment-col-sp">Sản phẩm</span>
                        <span>Loại</span>
                        <span>Số lượng</span>
                        <span>Đơn giá</span>
                        <span>Thành tiền</span>
                    </div>
                    <div className="payment-container-product">
                        <div className="payment-product-card">
                            <div className="payment-product-info">
                                <img src={sanpham} alt="product"/>
                                <span className="payment-name-sp">Tã dán Huggies Skin Perfect size S</span>
                            </div>
                            <div className="payment-type-sp">Gói 80 miếng</div>
                            <div className="payment-qty-sp">1</div>
                            <div className="payment-price-sp">300.000đ</div>
                            <div className="payment-total-sp">300.000đ</div>
                        </div>
                    </div>
                </div>

                {/* SHIPPING */}
                <div className="payment-ship-type">
                    <div className="payment-title">
                        <span>Phương thức vận chuyển</span>
                        <a href="#" className="payment-link-change">Đổi phương thức</a>
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
                    <div className="payment-container-method" style={{
                        backgroundColor: "#fff", padding: "20px", borderRadius: "12px", marginTop: "10px"
                    }}>
                        <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
                            <input
                                type="radio" id="method_cod" name="payment_choice" value="cod"
                                checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")}
                                style={{ width: "18px", height: "18px", marginRight: "12px", accentColor: "#ff69b4", cursor: "pointer" }}
                            />
                            <label htmlFor="method_cod" style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "15px" }}>
                                <i className="fa-solid fa-money-bill-wave" style={{ color: "#4caf50", marginRight: "10px", fontSize: "18px" }}></i>
                                Thanh toán tiền mặt khi nhận hàng (COD)
                            </label>
                        </div>

                        <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
                            <input
                                type="radio" id="method_momo" name="payment_choice" value="momo"
                                checked={paymentMethod === "momo"} onChange={() => setPaymentMethod("momo")}
                                style={{ width: "18px", height: "18px", marginRight: "12px", accentColor: "#ff69b4", cursor: "pointer" }}
                            />
                            <label htmlFor="method_momo" style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "15px" }}>
                                <i className="fa-solid fa-wallet" style={{ color: "#a50064", marginRight: "10px", fontSize: "18px" }}></i>
                                Thanh toán trực tuyến qua Ví điện tử MoMo
                            </label>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="radio" id="method_vnpay" name="payment_choice" value="vnpay"
                                checked={paymentMethod === "vnpay"} onChange={() => setPaymentMethod("vnpay")}
                                style={{ width: "18px", height: "18px", marginRight: "12px", accentColor: "#ff69b4", cursor: "pointer" }}
                            />
                            <label htmlFor="method_vnpay" style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "15px" }}>
                                <i className="fa-solid fa-credit-card" style={{ color: "#005baa", marginRight: "10px", fontSize: "18px" }}></i>
                                Thanh toán trực tuyến qua Cổng VNPAY (ATM / Visa / QR Code)
                            </label>
                        </div>
                    </div>
                </div>

                {/* SUMMARY */}
                <div className="payment-section" style={{ marginTop: "20px" }}>
                    <div className="payment-voucher-box">
                        <img src={voucher} alt="voucher"></img>
                        <span>Mã giảm giá:</span>
                        <input type="text" placeholder="Nhập mã voucher..." />
                        <button className="payment-btn-apply">Áp dụng</button>
                    </div>

                    <div className="payment-total-summary">
                        <div className="payment-row"><span>Tiền hàng:</span><span>300.000đ</span></div>
                        <div className="payment-row"><span>Phí ship:</span><span>25.000đ</span></div>
                        <div className="payment-row"><span>Giảm giá:</span><span className="payment-minus">-10.000đ</span></div>
                        <div className="payment-row payment-final">
                            <strong>Tổng thanh toán:</strong>
                            <strong className="payment-pink-text">315.000đ</strong>
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