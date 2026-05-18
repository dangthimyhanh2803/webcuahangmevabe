import React from "react";
import "./payment.css";
import map from "../../assets/icons/icondiachi.png";
import sanpham from "../../assets/icons/Sanpham.png";
import voucher from "../../assets/header/voucher.svg";
const Payment: React.FC = () => {
    return (
        <div className="payment-page">
            {/* BODY */}
            <div className="payment-body-page">

                {/* ADDRESS */}
                <div className="payment-address">
                    <div className="payment-title">
                        <span>Địa chỉ nhận hàng</span>
                    </div>

                    <div className="payment-container-address">
                        <div className="payment-icon">
                            <img src={map} alt="map" className="promo-map" />
                        </div>

                        <div className="payment-info-user">
                            <div className="payment-name-phone">
                                <span className="payment-name">Lý Thái Minh Khang</span>
                                <span className="payment-phone">0123456789</span>
                            </div>

                            <div className="payment-address-detail">
                                <p>
                                    Trần Nguyên Hãn, Phường Dĩ An, Tp.Dĩ An, Tỉnh Bình Dương
                                </p>
                            </div>
                        </div>

                        <div className="payment-btn-change-address">
                            <button>
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
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

                            {/* GỘP LẠI */}
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

                <div className="payment-section">
                    <div className="payment-voucher-box">
                        <img src={voucher} alt="voucher"></img>
                        <span>Mã giảm giá:</span>
                        <input type="text" placeholder="Nhập mã voucher..." />
                        <button className="payment-btn-apply">Áp dụng</button>
                    </div>

                    <div className="payment-total-summary">
                        <div className="payment-row">
                            <span>Tiền hàng:</span>
                            <span>300.000đ</span>
                        </div>
                        <div className="payment-row">
                            <span>Phí ship:</span>
                            <span>25.000đ</span>
                        </div>
                        <div className="payment-row">
                            <span>Giảm giá:</span>
                            <span className="payment-minus">-10.000đ</span>
                        </div>

                        <div className="payment-row payment-final">
                            <strong>Tổng thanh toán:</strong>
                            <strong className="payment-pink-text">315.000đ</strong>
                        </div>
                    </div>

                    <div className="payment-btn-group">
                        <button className="payment-btn-back">
                            Quay lại giỏ hàng
                        </button>
                        <button className="payment-btn-confirm">
                            Xác nhận thanh toán
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;