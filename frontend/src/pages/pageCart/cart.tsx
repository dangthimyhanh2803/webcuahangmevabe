import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./cart.css";
import sanpham from "../../assets/icons/Sanpham.png";
import map from "../../assets/icons/icondiachi.png";
import voucher from "../../assets/header/voucher.svg";

interface ProductItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    checked: boolean;
}

const CartPage: React.FC = () => {
    const navigate = useNavigate();

    // Khởi tạo state cho danh sách sản phẩm kèm thuộc tính số lượng (quantity) và trạng thái chọn (checked)
    const [products, setProducts] = useState<ProductItem[]>([
        { id: 1, name: "Sữa cho bé cao cấp", price: 250000, image: sanpham, quantity: 1, checked: true },
        { id: 2, name: "Tã em bé siêu thấm", price: 180000, image: sanpham, quantity: 1, checked: true },
        { id: 3, name: "Bình sữa an toàn", price: 120000, image: sanpham, quantity: 1, checked: true },
    ]);

    // Hàm xử lý tăng/giảm số lượng
    const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === id) {
                    let newQuantity = product.quantity;
                    if (type === "increase") {
                        newQuantity += 1;
                    } else if (type === "decrease" && product.quantity > 1) {
                        newQuantity -= 1;
                    }
                    return { ...product, quantity: newQuantity };
                }
                return product;
            })
        );
    };

    // Hàm xử lý tích chọn / bỏ chọn checkbox sản phẩm (chỉ tính tiền sản phẩm được chọn)
    const handleCheckboxChange = (id: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, checked: !product.checked } : product
            )
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProduct = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        }
    };

    // LOGIC TÍNH TOÁN CÁC CHI PHÍ HÓA ĐƠN:
    // 1. Tính tạm = Tổng (Đơn giá * Số lượng) của những sản phẩm được tích chọn
    const temporaryTotal = products
        .filter((p) => p.checked)
        .reduce((sum, p) => sum + p.price * p.quantity, 0);

    // 2. Số tiền giảm giá cố định (Ví dụ: hệ thống đang cấu hình giảm 12.000 VNĐ)
    const discountAmount = temporaryTotal > 0 ? 12000 : 0;

    // 3. Tổng tiền cuối cùng sau giảm giá (Nếu giỏ hàng trống hoặc không chọn gì thì bằng 0)
    const finalTotal = Math.max(0, temporaryTotal - discountAmount);

    return (
        <main className="cart-wrapper">
            <div className="cart-container">
                {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
                <div className="cart-left">
                    <div className="cart-header">
                        <span className="col-product">Sản phẩm</span>
                        <span>Đơn giá</span>
                        <span>Size</span>
                        <span>Số lượng</span>
                        <span>Thành tiền</span>
                    </div>

                    {products.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                            Giỏ hàng của bạn đang trống!
                        </div>
                    ) : (
                        products.map((product) => (
                            <div className="cart-item" key={product.id}>
                                <div className="col-product">
                                    <input
                                        type="checkbox"
                                        checked={product.checked}
                                        onChange={() => handleCheckboxChange(product.id)}
                                    />
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
                                        <button onClick={() => handleQuantityChange(product.id, "decrease")}>-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => handleQuantityChange(product.id, "increase")}>+</button>
                                    </div>
                                </div>

                                <div className="col-total">
                                    {/* Thành tiền của từng sản phẩm = Đơn giá * Số lượng */}
                                    {(product.price * product.quantity).toLocaleString()} VNĐ
                                    <i
                                        className="fa-solid fa-trash-can delete-icon"
                                        style={{ cursor: "pointer", marginLeft: "10px" }}
                                        onClick={() => handleDeleteProduct(product.id)}
                                    ></i>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* BÊN PHẢI: KHỐI THÔNG TIN THANH TOÁN */}
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
                            <span>{temporaryTotal.toLocaleString()} VNĐ</span>
                        </div>
                        <div className="price-row discount">
                            <span>Giảm giá sản phẩm</span>
                            <span>-{discountAmount.toLocaleString()} VNĐ</span>
                        </div>
                        <hr />
                        <div className="price-row final">
                            <strong>Tổng tiền</strong>
                            <strong className="total-price">{finalTotal.toLocaleString()} VNĐ</strong>
                        </div>
                        <p className="vat-note">(Đã bao gồm VAT)</p>
                        <button
                            className="btn-checkout"
                            disabled={finalTotal === 0}
                            style={{ opacity: finalTotal === 0 ? 0.6 : 1, cursor: finalTotal === 0 ? "not-allowed" : "pointer" }}
                            onClick={() => navigate("/payment")}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;