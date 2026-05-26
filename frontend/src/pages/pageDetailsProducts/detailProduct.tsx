import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./detailProduct.css";

// Khai báo cấu trúc dữ liệu sản phẩm nhận từ DB
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const DetailProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy mã ID sản phẩm từ URL
    const navigate = useNavigate();

    // Khởi tạo các State quản lý trạng thái tải dữ liệu
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State quản lý hành vi chọn thuộc tính sản phẩm của người dùng
    const [selectedSize, setSelectedSize] = useState<string>("S");
    const [quantity, setQuantity] = useState<number>(1);

    // CALL API: Chạy ngay khi màn hình chi tiết sản phẩm được tải lên
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                // Gọi API kết nối đến cổng Backend ở port 5000
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(response.data);
                setError(null);
            } catch (err: any) {
                console.error("Lỗi fetch sản phẩm:", err);
                setError(err.response?.data?.message || "Không thể tải thông tin sản phẩm từ hệ thống.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    // XỬ LÝ SỰ KIỆN: Tăng / Giảm số lượng mua
    const handleQuantityChange = (type: "increase" | "decrease") => {
        if (type === "increase") {
            setQuantity(prev => prev + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // XỬ LÝ SỰ KIỆN: Thêm sản phẩm vào giỏ hàng LocalStorage công khai
    const handleAddToCart = () => {
        if (!product) return;

        // Đọc danh sách giỏ hàng cũ đang có trong máy
        const savedCart = localStorage.getItem("cart_products");
        let cartList = savedCart ? JSON.parse(savedCart) : [];

        // Định dạng cấu trúc giá theo kích cỡ cho khớp với logic giỏ hàng cũ
        const priceBySize = {
            S: product.price,
            M: product.price + 20000,
            L: product.price + 40000
        };

        // Kiểm tra xem sản phẩm cùng ID và cùng Size này đã nằm trong giỏ chưa
        const existingIndex = cartList.findIndex((item: any) => item.id === product.id && item.size === selectedSize);

        if (existingIndex > -1) {
            // Nếu trùng, chỉ cộng dồn thêm số lượng
            cartList[existingIndex].quantity += quantity;
        } else {
            // Nếu chưa có, tiến hành thêm mới vào danh sách
            cartList.push({
                id: product.id,
                name: product.name,
                priceBySize: priceBySize,
                image: product.image,
                quantity: quantity,
                size: selectedSize,
                checked: true // Mặc định tích chọn để sẵn sàng thanh toán
            });
        }

        // Lưu lại vào LocalStorage
        localStorage.setItem("cart_products", JSON.stringify(cartList));
        alert(`🎉 Đã thêm thành công ${quantity} sản phẩm vào giỏ hàng!`);
    };

    // XỬ LÝ SỰ KIỆN: Ấn "Mua ngay" chuyển thẳng sang giỏ hàng / thanh toán
    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/cart"); // Chuyển hướng người dùng qua trang giỏ hàng để tiến hành checkout
    };

    // Giao diện hiển thị khi đang chờ đợi dữ liệu tải về từ Database
    if (loading) {
        return <div style={{ textAlign: "center", padding: "100px", fontSize: "18px", color: "#ff69b4" }}>⌛ Đang tải thông tin sản phẩm từ cơ sở dữ liệu...</div>;
    }

    // Giao diện hiển thị khi mã ID không tồn tại trong DB hoặc lỗi kết nối
    if (error || !product) {
        return (
            <div style={{ textAlign: "center", padding: "100px" }}>
                <div style={{ color: "#ff4d4f", fontSize: "18px", marginBottom: "15px" }}>⚠️ {error || "Không tìm thấy sản phẩm tương ứng!"}</div>
                <button onClick={() => navigate("/")} style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#ff69b4", color: "#fff", border: "none", borderRadius: "8px" }}>Quay lại trang chủ</button>
            </div>
        );
    }

    // Đường dẫn hình ảnh xử lý động: Kiểm tra xem link ảnh là dạng URL đầy đủ hay đường dẫn tĩnh nội bộ từ thư mục public
    const productImageUrl = product.image.startsWith("http") ? product.image : `http://localhost:5000/image/${product.image}`;

    return (
        <div className="detail-page">
            <main className="detail-container">
                <nav className="detail-breadcrumb">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Trang chủ</a> /{" "}
                    <a href="#/">Sản phẩm Mẹ & Bé</a> /{" "}
                    <span>{product.name}</span>
                </nav>

                <section className="detail-product">
                    {/* BÊN TRÁI: HÌNH ẢNH SẢN PHẨM LẤY TỪ DB */}
                    <div className="detail-gallery">
                        <div className="detail-main-image">
                            <img src={productImageUrl} alt={product.name} onError={(e) => {
                                // Fallback nếu ảnh lỗi không tìm thấy trên server
                                (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Green+Baby";
                            }}/>
                        </div>

                        <div className="detail-thumbnail-list">
                            <div className="detail-thumb active"><img src={productImageUrl} alt="thumb"/></div>
                            <div className="detail-thumb"><img src={productImageUrl} alt="thumb"/></div>
                            <div className="detail-thumb"><img src={productImageUrl} alt="thumb"/></div>
                        </div>
                    </div>

                    {/* BÊN PHẢI: THÔNG TIN CHI TIẾT SẢN PHẨM LẤY TỪ DB */}
                    <div className="detail-info">
                        <h1 className="detail-price">
                            {product.price.toLocaleString()}đ
                        </h1>

                        <h2 className="detail-title">
                            {product.name}
                        </h2>

                        <div className="detail-rating">
                            <span>4.8 </span>
                            <div className="detail-stars">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="detail-review-count">Đánh giá: 145</span>
                        </div>

                        <div className="detail-shipping">
                            <p>
                                <i className="fa-solid fa-truck-fast"></i>
                                {" "}Giao hàng nhanh: Dự kiến nhận hàng trong 24 giờ tới.
                            </p>
                        </div>

                        {/* CHỌN SIZE */}
                        <div className="detail-options">
                            <span>Size:</span>
                            <div className="detail-size-btns">
                                {["S", "M", "L"].map((size) => (
                                    <button
                                        key={size}
                                        className={selectedSize === size ? "active" : ""}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ĐIỀU KHIỂN SỐ LƯỢNG */}
                        <div className="detail-quantity">
                            <span>Số lượng:</span>
                            <div className="detail-q-control">
                                <button onClick={() => handleQuantityChange("decrease")}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange("increase")}>+</button>
                            </div>
                        </div>

                        {/* NHÓM NÚT HÀNH ĐỘNG MUA HÀNG */}
                        <div className="detail-actions">
                            <button className="detail-btn-cart" onClick={handleAddToCart} title="Thêm vào giỏ hàng">
                                <i className="fa-solid fa-cart-plus"></i>
                            </button>
                            <button className="detail-btn-buy" onClick={handleBuyNow}>Mua hàng</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DetailProduct;