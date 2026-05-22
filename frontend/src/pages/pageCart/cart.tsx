import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./cart.css";
import sanpham from "../../assets/icons/Sanpham.png";
import map from "../../assets/icons/icondiachi.png";
import voucher from "../../assets/header/voucher.svg";

// Cấu trúc dữ liệu của một sản phẩm trong giỏ hàng
interface ProductItem {
    id: number;
    name: string;
    // Lưu bảng giá theo size: cấu trúc dạng { S: 250000, M: 270000, L: 290000 }
    priceBySize: { [key: string]: number };
    image: string;
    quantity: number;
    size: "S" | "M" | "L"; // Size hiện tại đang chọn
    checked: boolean;
}

const CartPage: React.FC = () => {
    const navigate = useNavigate();

    // Khởi tạo State danh sách sản phẩm kèm bảng giá riêng cho từng Size
    const [products, setProducts] = useState<ProductItem[]>([
        {
            id: 1,
            name: "Sữa cho bé cao cấp",
            priceBySize: { S: 250000, M: 270000, L: 290000 }, // Giá tăng dần theo size
            image: sanpham,
            quantity: 1,
            size: "S",
            checked: true
        },
        {
            id: 2,
            name: "Tã em bé siêu thấm",
            priceBySize: { S: 180000, M: 200000, L: 220000 },
            image: sanpham,
            quantity: 1,
            size: "S",
            checked: true
        },
        {
            id: 3,
            name: "Bình sữa an toàn",
            priceBySize: { S: 120000, M: 135000, L: 150000 },
            image: sanpham,
            quantity: 1,
            size: "S",
            checked: true
        },
    ]);

    // Xử lý khi người dùng thay đổi Size trong thẻ <select>
    const handleSizeChange = (id: number, newSize: "S" | "M" | "L") => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, size: newSize } : product
            )
        );
    };

    // Xử lý tăng/giảm số lượng sản phẩm (+ / -)
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

    // Xử lý khi tích chọn hoặc bỏ tích chọn checkbox
    const handleCheckboxChange = (id: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, checked: !product.checked } : product
            )
        );
    };

    // Xử lý xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProduct = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        }
    };

    // LOGIC TỰ ĐỘNG TÍNH TOÁN TIỀN HÓA ĐƠN:
    // Tính tạm = Tổng (Đơn giá của size đang chọn * Số lượng) của những sản phẩm có tích checkbox
    const temporaryTotal = products
        .filter((p) => p.checked)
        .reduce((sum, p) => sum + p.priceBySize[p.size] * p.quantity, 0);

    // Tiền giảm giá cố định (chỉ giảm khi có sản phẩm được chọn)
    const discountAmount = temporaryTotal > 0 ? 12000 : 0;

    // Tổng tiền thanh toán cuối cùng
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
                        products.map((product) => {
                            // Lấy ra mức giá hiện tại tương ứng với size đang chọn
                            const currentPrice = product.priceBySize[product.size];

                            return (
                                <div className="cart-item" key={product.id}>
                                    {/* THÔNG TIN SẢN PHẨM & CHECKBOX */}
                                    <div className="col-product">
                                        <input
                                            type="checkbox"
                                            checked={product.checked}
                                            onChange={() => handleCheckboxChange(product.id)}
                                        />
                                        <img src={product.image} alt={product.name} />
                                        <span className="item-name">{product.name}</span>
                                    </div>

                                    {/* ĐƠN GIÁ (TỰ ĐỘNG THAY ĐỔI THEO SIZE) */}
                                    <div className="col-price">
                                        {currentPrice.toLocaleString()} VNĐ
                                    </div>

                                    {/* CHỌN SIZE */}
                                    <div className="col-size">
                                        <select
                                            value={product.size}
                                            onChange={(e) => handleSizeChange(product.id, e.target.value as "S" | "M" | "L")}
                                            style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer" }}
                                        >
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                        </select>
                                    </div>

                                    {/* SỐ LƯỢNG (+ / -) */}
                                    <div className="col-quantity">
                                        <div className="q-btn">
                                            <button onClick={() => handleQuantityChange(product.id, "decrease")}>-</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => handleQuantityChange(product.id, "increase")}>+</button>
                                        </div>
                                    </div>

                                    {/* THÀNH TIỀN = GIÁ THEO SIZE * SỐ LƯỢNG */}
                                    <div className="col-total">
                                        {(currentPrice * product.quantity).toLocaleString()} VNĐ
                                        <i
                                            className="fa-solid fa-trash-can delete-icon"
                                            style={{ cursor: "pointer", marginLeft: "15px", color: "#ff4d4f" }}
                                            onClick={() => handleDeleteProduct(product.id)}
                                        ></i>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* BÊN PHẢI: KHỐI TỔNG HỢP CHI PHÍ */}
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
                            style={{
                                opacity: finalTotal === 0 ? 0.6 : 1,
                                cursor: finalTotal === 0 ? "not-allowed" : "pointer"
                            }}
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