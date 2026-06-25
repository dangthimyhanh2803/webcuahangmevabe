import React, {useState, useEffect} from "react";

import {useNavigate, useLocation} from "react-router-dom";


import "./cart.css";
import sanpham from "../../assets/icons/Sanpham.png";
import map from "../../assets/icons/icondiachi.png";
import axios from "axios";
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
    const location = useLocation();
// 1. STATE QUẢN LÝ ĐỊA CHỈ NHẬN HÀNG
    const [address, setAddress] = useState<string>("");
    const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
    const [tempAddress, setTempAddress] = useState<string>("");
    const handleEditAddress = () => {
        setTempAddress(address);
        setIsEditingAddress(true);

    };
    const handleSaveAddress = () => {
        setAddress(tempAddress);
        setIsEditingAddress(false);

    };
    useEffect(() => {
        const fetchDefaultAddress = async () => {
            try {
                const userStr = localStorage.getItem("user");
                if (!userStr) return; // Nếu chưa đăng nhập thì không làm gì

                const currentUser = JSON.parse(userStr);
                if (!currentUser.userId) return;

                // Gọi API lấy địa chỉ của user này
                const res = await axios.get(`http://localhost:5000/api/address/user/${currentUser.userId}`);
                const addressList = res.data;

                // Tìm địa chỉ mặc định (isDefault === 1) hoặc lấy cái đầu tiên nếu không có cái nào mặc định
                const defaultAddr = addressList.find((a: any) => a.isDefault === 1) || addressList[0];

                if (defaultAddr) {
                    // Tạo chuỗi địa chỉ hoàn chỉnh
                    const fullAddress = `${defaultAddr.detailAddress}, ${defaultAddr.district}, ${defaultAddr.province}`;
                    setAddress(fullAddress);
                }
            } catch (error) {
                console.error("Lỗi khi tải địa chỉ mặc định:", error);
            }
        };

        fetchDefaultAddress();
    }, [location.key]);
// 2. STATE QUẢN LÝ SẢN PHẨM: ĐÃ XÓA SẢN PHẨM MẶC ĐỊNH
    const [products, setProducts] = useState<ProductItem[]>(() => {
// Chỉ lấy dữ liệu từ LocalStorage được lưu khi ấn nút "Thêm vào giỏ hàng"
        const saved = localStorage.getItem("cart_products");
        return saved ? JSON.parse(saved) : []; // Nếu chưa có sản phẩm nào thì trả về mảng rỗng []
    });
// Hàm lưu trạng thái giỏ hàng cập nhật vào LocalStorage

    const saveAndSetProducts = (newProducts: ProductItem[]) => {
        setProducts(newProducts);
        localStorage.setItem("cart_products", JSON.stringify(newProducts));
    };

    const handleSizeChange = (id: number, newSize: "S" | "M" | "L") => {

        const updated = products.map((product) =>

            product.id === id ? {...product, size: newSize} : product
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
                return {...product, quantity: newQuantity};
            }
            return product;
        });
        saveAndSetProducts(updated);
    };
    const handleCheckboxChange = (id: number) => {

        const updated = products.map((product) =>

            product.id === id ? {...product, checked: !product.checked} : product
        );

        saveAndSetProducts(updated);

    };


    const handleDeleteProduct = (id: number) => {

        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {

            const updated = products.filter((product) => product.id !== id);

            saveAndSetProducts(updated);

        }

    };


// 3. LOGIC TÍNH TOÁN TIỀN TỰ ĐỘNG

    const selectedProducts = products.filter((p) => p.checked);

    const temporaryTotal = selectedProducts.reduce((sum, p) => {

// Phòng hờ nếu cấu trúc dữ liệu truyền từ trang khác qua chỉ có trường .price thay vì .priceBySize

        const currentPrice = p.priceBySize ? p.priceBySize[p.size] : ((p as any).price || 0);

        return sum + currentPrice * p.quantity;

    }, 0);

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

                        <div className="cart-empty">

                            🛒 Giỏ hàng của bạn đang trống! <br/>

                            <span className="cart-empty-sub">Vui lòng quay lại trang chủ chọn sản phẩm cần mua.</span>

                        </div>

                    ) : (

                        products.map((product) => {

                            const currentPrice = product.priceBySize ? product.priceBySize[product.size] : ((product as any).price || 0);


                            return (

                                <div className="cart-item" key={product.id}>

                                    <div className="col-product">

                                        <input

                                            type="checkbox"

                                            checked={product.checked}

                                            onChange={() => handleCheckboxChange(product.id)}

                                        />

                                        <img
                                            src={product.image.startsWith("http") ? product.image : `http://localhost:5000/image/${product.image}`}
                                            alt={product.name} onError={(e) => {

                                            (e.target as HTMLImageElement).src = sanpham; // Ảnh dự phòng nếu lỗi link đường dẫn tĩnh

                                        }}/>

                                        <span className="item-name">{product.name}</span>

                                    </div>


                                    <div className="col-price">

                                        {currentPrice.toLocaleString()}đ

                                    </div>


                                    <div className="col-size">

                                        <select

                                            value={product.size}

                                            onChange={(e) => handleSizeChange(product.id, e.target.value as "S" | "M" | "L")}

                                        >

                                            <option value="S">S</option>

                                            <option value="M">M</option>

                                            <option value="L">L</option>

                                        </select>

                                    </div>


                                    <div className="col-quantity">

                                        <div className="q-btn">

                                            <button onClick={() => handleQuantityChange(product.id, "decrease")}>-
                                            </button>

                                            <span>{product.quantity}</span>

                                            <button onClick={() => handleQuantityChange(product.id, "increase")}>+
                                            </button>

                                        </div>

                                    </div>


                                    <div className="col-total">
                                        {(currentPrice * product.quantity).toLocaleString()}đ
                                        <i
                                            className="fa-solid fa-trash-can delete-icon"
                                            onClick={() => handleDeleteProduct(product.id)}

                                        ></i>

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>


                {/* BÊN PHẢI: THÔNG TIN THANH TOÁN */}

                <div className="cart-right">

                    <div className="summary-box">

                        <h3>Địa chỉ nhận hàng</h3>

                        {isEditingAddress ? (

                            <div className="address-edit-form">

                                <textarea
                                    className="address-textarea"
                                    value={tempAddress}
                                    onChange={(e) => setTempAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ nhận hàng..."
                                    autoFocus
                                />

                                <div className="address-edit-actions">

                                    <button className="btn-cancel-addr" onClick={() => setIsEditingAddress(false)}>Hủy</button>

                                    <button className="btn-save-addr" onClick={handleSaveAddress}>Lưu</button>

                                </div>

                            </div>

                        ) : (

                            address ? (

                                <div className="address-display">
                                    <div className="address-box">
                                        <img src={map} alt="map" className="address-map-icon"/>
                                        <span>{address}</span>
                                    </div>
                                    <button className="btn-change-address" onClick={() => navigate("/address")}>Thay đổi địa chỉ</button>
                                </div>
                            ) : (
                                <button className="btn-location" onClick={handleEditAddress}>
                                    <img src={map} alt="map"/> Xác định địa chỉ nhận hàng
                                </button>
                            )
                        )}
                    </div>
                    <div className="summary-box total-box">
                        <div className="price-row"><span>Tính tạm</span><span>{temporaryTotal.toLocaleString()}đ</span>
                        </div>
                        <div className="price-row discount">
                            <span>Giảm giá</span><span>-{discountAmount.toLocaleString()}đ</span></div>
                        <hr/>
                        <div className="price-row final"><strong>Tổng tiền</strong><strong
                            className="total-price">{finalTotal.toLocaleString()}đ</strong></div>
                        <button
                            className="btn-checkout"
                            disabled={selectedProducts.length === 0}
                            onClick={() => {
                                if (!address) {
                                    alert("Vui lòng nhập địa chỉ nhận hàng trước khi thanh toán!");

                                    return;

                                }

// Gửi toàn bộ thông tin sản phẩm sang màn hình payment
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