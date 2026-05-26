import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 Thêm axios để gọi API
import AccoutMenu from "../../components/accoutMenu";
import sanpham from "../../assets/icons/Sanpham.png";
import "./history.css";

// Cấu trúc dữ liệu Đơn hàng nhận từ Backend ảo gửi về
interface OrderItem {
    orderDetailId: number;
    orderId: number;
    productId: number;
    name: string;
    size: "S" | "M" | "L";
    quantity: number;
    price: number;
    image: string;
    status: string; // Trạng thái của đơn hàng chứa item này
}

const History: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("Tất cả");

    // 👈 Đổi biến products thành State để lưu dữ liệu từ API đổ vào
    const [products, setProducts] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const tabs = ["Tất cả", "Chờ thanh toán", "Vận chuyển", "Chờ giao hàng", "Hoàn thành"];

    // 👈 Lấy dữ liệu ảo từ Backend khi trang được load
    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                // Giả định userId test là 1 (trùng với userId trong mock data backend)
                const userId = 1;
                const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`); // Thay port của bạn nếu khác

                // Vì Backend trả về mảng Đơn hàng, mỗi đơn hàng có mảng `items` bên trong.
                // Chúng ta sẽ "phẳng hóa" (flatten) ra thành danh sách các sản phẩm để khớp với giao diện cũ của bạn.
                const allItems: OrderItem[] = [];
                response.data.forEach((order: any) => {
                    if (order.items && order.items.length > 0) {
                        order.items.forEach((item: any) => {
                            allItems.push({
                                ...item,
                                status: order.status // Lấy luôn trạng thái của đơn hàng gán vào item
                            });
                        });
                    }
                });

                setProducts(allItems);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử đơn hàng ảo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    // Lọc sản phẩm theo Tab được chọn
    const filteredProducts = activeTab === "Tất cả"
        ? products
        : products.filter(p => p.status === activeTab);

    return (
        <div className="history">
            {/* Breadcrumb */}
            <p className="history-breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href="/account"> Trang cá nhân</a> &gt;
                <span> Lịch sử đơn hàng</span>
            </p>

            <div className="history-container">
                {/* Menu bên trái */}
                <AccoutMenu />

                {/* Khu vực hiển thị lịch sử đơn hàng */}
                <div className="history-section">
                    {/* Các tab trạng thái đơn hàng */}
                    <div className="history-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={activeTab === tab ? "active" : ""}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tiêu đề bảng */}
                    <div className="cart-header history-header">
                        <div className="col-product">Sản phẩm</div>
                        <div>Giá</div>
                        <div>Kích cỡ</div>
                        <div>Số lượng</div>
                        <div>Tổng số tiền</div>
                    </div>

                    {/* Danh sách sản phẩm trong lịch sử */}
                    <div className="history-list">
                        {loading ? (
                            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                                Đang tải lịch sử đơn hàng...
                            </p>
                        ) : filteredProducts.length === 0 ? (
                            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                                Không có đơn hàng nào trong trạng thái này.
                            </p>
                        ) : (
                            filteredProducts.map((product) => (
                                <div key={product.orderDetailId} className="history-item">
                                    <div
                                        className="col-product"
                                        onClick={() => navigate(`/detailproduct/${product.productId}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {/* Nếu ảnh từ database/mock lỗi thì hiển thị ảnh mặc định `sanpham` */}
                                        <img src={product.image || sanpham} alt={product.name} />
                                        <span className="history-item-name">{product.name}</span>
                                    </div>

                                    <div className="history-col-price">
                                        {product.price.toLocaleString()} VNĐ
                                    </div>

                                    <div className="history-col-size">
                                        <span>{product.size}</span>
                                    </div>

                                    <div className="history-col-quantity">
                                        <span>{product.quantity}</span>
                                    </div>

                                    <div className="history-col-total">
                                        {(product.price * product.quantity).toLocaleString()} VNĐ
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;