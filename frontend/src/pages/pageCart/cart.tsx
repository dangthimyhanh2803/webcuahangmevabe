import React from "react";
import { useNavigate } from "react-router-dom";

import "./cart.css";
import sanpham from "../../assets/icons/Sanpham.png";
import map from "../../assets/icons/icondiachi.png";
import voucher from "../../assets/header/voucher.svg";
const CartPage: React.FC = () => {
    const products = [
        { id: 1, name: "Sữa cho bé cao cấp", price: 250000, image: sanpham },
        { id: 2, name: "Tã em bé siêu thấm", price: 180000, image: sanpham },
        { id: 3, name: "Bình sữa an toàn", price: 120000, image: sanpham },
    ];
    const navigate = useNavigate();
    return (
        <main className="cart-wrapper">
            <div className="cart-container">
                <div className="cart-left">
                    <div className="cart-header">
                        <span className="col-product">Sản phẩm</span>
                        <span>Đơn giá</span>
                        <span>Size</span>
                        <span>Số lượng</span>
                        <span>Thành tiền</span>
                    </div>

                    {products.map((product) => (
                        <div className="cart-item" key={product.id}>
                            <div className="col-product">
                                <input type="checkbox" defaultChecked />
                                <img src={product.image} alt={product.name} />
                                <span className="item-name">{product.name}</span>
                            </div>

                            <div className="col-price">
                                {product.price.toLocaleString()} VNĐ
                            </div>

                            <div className="col-size">
                                <select>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                </select>
                            </div>

                            <div className="col-quantity">
                                <div className="q-btn">
                                    <button>-</button>
                                    <span>1</span>
                                    <button>+</button>
                                </div>
                            </div>

                            <div className="col-total">
                                {product.price.toLocaleString()} VNĐ
                                <i className="fa-solid fa-trash-can delete-icon"></i>
                            </div>
                        </div>
                    ))}
                </div>
                {/* RIGHT */}
                <div className="cart-right">
                    <div className="summary-box">
                        <h3>Địa chỉ nhận hàng</h3>
                        <button className="btn-location">
                            <img src={map} alt="map"/>
                            Xác định địa chỉ nhận hàng
                        </button>
                    </div>
                    <div className="summary-box">
                        <h3>Mã giảm giá</h3>
                        <button className="btn-coupon">
                            <img src={voucher} alt="voucher"/>
                            Bấm vào để chọn hoặc nhập mã
                        </button>
                    </div>
                    <div className="summary-box total-box">
                        <div className="price-row">
                            <span>Tính tạm</span>
                            <span>112.000 VNĐ</span>
                        </div>
                        <div className="price-row discount">
                            <span>Giảm giá sản phẩm</span>
                            <span>-12.000 VNĐ</span>
                        </div>
                        <hr />
                        <div className="price-row final">
                            <strong>Tổng tiền</strong>
                            <strong className="total-price">100.000 VNĐ</strong>
                        </div>
                        <p className="vat-note">(Đã bao gồm VAT)</p>
                        <button className="btn-checkout" onClick={() => navigate("/payment")}>
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
export default CartPage;