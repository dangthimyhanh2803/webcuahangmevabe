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
    priceBySize: { [key: string]: number };
    image: string;
    quantity: number;
    size: "S" | "M" | "L";
    checked: boolean;
}

const CartPage: React.FC = () => {
    const navigate = useNavigate();

    // 1. STATE QUẢN LÝ ĐỊA CHỈ NHẬN HÀNG
    const [address, setAddress] = useState<string>(""); // Lưu địa chỉ chính thức
    const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false); // Trạng thái bật/tắt khung sửa
    const [tempAddress, setTempAddress] = useState<string>(""); // Lưu địa chỉ tạm khi đang gõ

    // Mở khung nhập địa chỉ
    const handleEditAddress = () => {
        setTempAddress(address);
        setIsEditingAddress(true);
    };

    // Lưu địa chỉ
    const handleSaveAddress = () => {
        setAddress(tempAddress);
        setIsEditingAddress(false);
    };

    // 2. STATE QUẢN LÝ SẢN PHẨM (Trong thực tế, bạn nên đưa state này lên AppContext hoặc Redux để đồng bộ xóa)
    // Ở đây, để giải quyết bài toán, chúng ta giả định danh sách giỏ hàng lưu ở LocalStorage hoặc State tổng.
    const [products, setProducts] = useState<ProductItem[]>(() => {
        const saved = localStorage.getItem("cart_products");
        if (saved) return JSON.parse(saved);
        return [
            {
                id: 1,
                name: "Sữa cho bé cao cấp",
                priceBySize: { S: 250000, M: 270000, L: 290000 },
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
        ];
    });

    // Hàm phụ trợ lưu trạng thái vào LocalStorage để trang xác nhận có thể vào xóa
    const saveAndSetProducts = (newProducts: ProductItem[]) => {
        setProducts(newProducts);
        localStorage.setItem("cart_products", JSON.stringify(newProducts));
    };

    const handleSizeChange = (id: number, newSize: "S" | "M" | "L") => {
        const updated = products.map((product) =>
            product.id === id ? { ...product, size: newSize } : product
        );
        saveAndSetProducts(updated);
    };

    const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
        const updated = products.map((product) => {
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
        });
        saveAndSetProducts(updated);
    };

    const handleCheckboxChange = (id: number) => {
        const updated = products.map((product) =>
            product.id === id ? { ...product, checked: !product.checked } : product
        );
        saveAndSetProducts(updated);
    };

    const handleDeleteProduct = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            const updated = products.filter((product) => product.id !== id);
            saveAndSetProducts(updated);
        }
    };

    // 3. LOGIC TÍNH TIỀN
    const selectedProducts = products.filter((p) => p.checked);
    const temporaryTotal = selectedProducts.reduce((sum, p) => sum + p.priceBySize[p.size] * p.quantity, 0);
    const discountAmount = temporaryTotal > 0 ? 12000 : 0;
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
                            const currentPrice = product.priceBySize[product.size];

                            return (
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
                                        {currentPrice.toLocaleString()} VNĐ
                                    </div>

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

                                    <div className="col-quantity">
                                        <div className="q-btn">
                                            <button onClick={() => handleQuantityChange(product.id, "decrease")}>-</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => handleQuantityChange(product.id, "increase")}>+</button>
                                        </div>
                                    </div>

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

                {/* BÊN PHẢI */}
                <div className="cart-right">
                    <div className="summary-box">
                        <h3>Địa chỉ nhận hàng</h3>
                        {isEditingAddress ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                                <textarea
                                    value={tempAddress}
                                    onChange={(e) => setTempAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ nhận hàng..."
                                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ffb6c1", minHeight: "70px", resize: "none", outline: "none" }}
                                    autoFocus
                                />
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={() => setIsEditingAddress(false)} style={{ flex: 1, padding: "8px", cursor: "pointer" }}>Hủy</button>
                                    <button onClick={handleSaveAddress} style={{ flex: 1, padding: "8px", backgroundColor: "#ff69b4", color: "#fff", cursor: "pointer" }}>Lưu</button>
                                </div>
                            </div>
                        ) : (
                            address ? (
                                <div style={{ marginTop: "10px" }}>
                                    <div style={{ display: "flex", gap: "10px", backgroundColor: "#fff0f6", padding: "12px", borderRadius: "8px" }}>
                                        <img src={map} alt="map" style={{ width: "20px", height: "20px" }} />
                                        <span>{address}</span>
                                    </div>
                                    <button onClick={handleEditAddress} style={{ marginTop: "10px", width: "100%", padding: "8px", color: "#ff69b4", backgroundColor: "#fff", cursor: "pointer" }}>Thay đổi địa chỉ</button>
                                </div>
                            ) : (
                                <button className="btn-location" onClick={handleEditAddress}>
                                    <img src={map} alt="map"/> Xác định địa chỉ nhận hàng
                                </button>
                            )
                        )}
                    </div>

                    <div className="summary-box total-box">
                        <div className="price-row"><span>Tính tạm</span><span>{temporaryTotal.toLocaleString()} VNĐ</span></div>
                        <div className="price-row discount"><span>Giảm giá</span><span>-{discountAmount.toLocaleString()} VNĐ</span></div>
                        <hr />
                        <div className="price-row final"><strong>Tổng tiền</strong><strong className="total-price">{finalTotal.toLocaleString()} VNĐ</strong></div>

                        <button
                            className="btn-checkout"
                            disabled={selectedProducts.length === 0}
                            style={{ opacity: selectedProducts.length === 0 ? 0.6 : 1, cursor: selectedProducts.length === 0 ? "not-allowed" : "pointer" }}
                            onClick={() => {
                                if (!address) {
                                    alert("Vui lòng nhập địa chỉ nhận hàng trước khi thanh toán!");
                                    return;
                                }
                                // GỬI TOÀN BỘ THÔNG TIN SẢN PHẨM ĐÃ CHỌN QUÁ STATE
                                navigate("/payment", {
                                    state: {
                                        address: address,
                                        checkoutProducts: selectedProducts,
                                        temporaryTotal: temporaryTotal,
                                        discountAmount: discountAmount,
                                        finalTotal: finalTotal
                                    }
                                });
                            }}
                        >
                            Thanh toán ({selectedProducts.length})
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;