import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccoutMenu from "../../components/accoutMenu";
import sanpham from "../../assets/icons/Sanpham.png";
import "./history.css";

interface OrderItem {
    orderDetailId: number;
    productId: number;
    name: string;
    size: "S" | "M" | "L";
    quantity: number;
    price: number;
    image: string;
}

interface OrderGroup {
    orderId: number;
    userId: number;
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    paymentMethod: string;
    status: string;
    items: OrderItem[];
}

const STATUS_MAP: { [key: string]: string } = {
    "Tất cả":         "all",
    "Chờ xác nhận":   "pending",
    "Chờ giao hàng":  "confirmed",
    "Đang giao hàng": "shipping",
    "Đã giao hàng":   "delivered",
    "Đã huỷ":         "cancelled"
};

const History: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("Tất cả");
    const [orders, setOrders] = useState<OrderGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const tabs = ["Tất cả", "Chờ xác nhận", "Chờ giao hàng", "Đang giao hàng", "Đã giao hàng", "Đã huỷ"];

    const fetchOrderHistory = async () => {
        try {
            setLoading(true);
            const userStr = localStorage.getItem("user");
            const currentUser = userStr ? JSON.parse(userStr) : {};
            const userId = currentUser.userId || currentUser.id;

            if (!userId) {
                console.error(" Lỗi: Không lấy được userId từ localStorage.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
            setOrders(response.data || []);
        } catch (error) {
            console.error(" Lỗi kết nối API lịch sử đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrderHistory(); }, []);

    const handleCancelOrder = async (orderId: number) => {
        if (!window.confirm("Bạn có chắc muốn huỷ toàn bộ đơn hàng này không?")) return;
        try {
            await axios.patch(`http://localhost:5000/api/orders/${orderId}/cancel`);
            alert("Huỷ đơn hàng thành công!");
            fetchOrderHistory();
        } catch (error: any) {
            const msg = error.response?.data?.message || "Có lỗi xảy ra khi huỷ đơn hàng";
            alert(msg);
        }
    };

    const filteredOrders = activeTab === "Tất cả"
        ? orders
        : orders.filter(o => {
            const targetStatus = STATUS_MAP[activeTab];
            if (!targetStatus) return false;
            return (o.status || "").toLowerCase() === targetStatus.toLowerCase();
        });

    const getImageSrc = (image: string) => {
        if (!image) return sanpham;
        if (image.startsWith("data:") || image.startsWith("http")) return image;
        return `http://localhost:5000${image}`;
    };

    //  HÀM KHỬ TRÙNG LẶP SẢN PHẨM: Xóa bỏ các dòng bị nhân bản do lỗi SQL JOIN nhiều ảnh
    const getUniqueItems = (items: OrderItem[]) => {
        if (!items) return [];
        const seen = new Set();
        return items.filter(item => {
            // Nếu có ID chi tiết đơn hàng (orderDetailId), dùng làm key để lọc
            if (item.orderDetailId) {
                if (seen.has(item.orderDetailId)) return false;
                seen.add(item.orderDetailId);
                return true;
            }
            // Nếu mất ID, dự phòng dùng ID sản phẩm + size làm key
            const fallbackKey = `${item.productId}_${item.size}`;
            if (seen.has(fallbackKey)) return false;
            seen.add(fallbackKey);
            return true;
        });
    };

    return (
        <div className="history">
            <p className="history-breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href="/account"> Trang cá nhân</a> &gt;
                <span> Lịch sử đơn hàng</span>
            </p>

            <div className="history-container">
                <AccoutMenu />

                <div className="history-section">
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

                    <div className="cart-header history-header">
                        <div className="col-product">Sản phẩm</div>
                        <div>Giá lẻ</div>
                        <div>Kích cỡ</div>
                        <div>Số lượng</div>
                        <div>Tạm tính</div>
                    </div>

                    <div className="history-list">
                        {loading ? (
                            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                                Đang tải lịch sử đơn hàng...
                            </p>
                        ) : filteredOrders.length === 0 ? (
                            <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                                Không có đơn hàng nào trong trạng thái này.
                            </p>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.orderId} className="order-group-wrapper" style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    marginBottom: "20px",
                                    padding: "15px",
                                    backgroundColor: "#fff"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0", paddingBottom: "8px", marginBottom: "12px", fontSize: "14px" }}>
                                        <span><strong>Mã đơn hàng:</strong> #{order.orderId}</span>
                                        <span style={{ color: "#ff4d4f", fontWeight: "bold", textTransform: "uppercase" }}>
                                            Trạng thái: {order.status}
                                        </span>
                                    </div>

                                    <div className="order-items-list">
                                        {/*  Đưa danh sách sản phẩm qua bộ lọc getUniqueItems() trước khi render */}
                                        {getUniqueItems(order.items).map((product) => (
                                            <div key={product.orderDetailId || `${product.productId}_${product.size}`} className="history-item">
                                                <div
                                                    className="col-product"
                                                    onClick={() => navigate(`/detailproduct/${product.productId}`)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <img
                                                        src={getImageSrc(product.image)}
                                                        alt={product.name}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).onerror = null;
                                                            (e.target as HTMLImageElement).src = sanpham;
                                                        }}
                                                    />
                                                    <span className="history-item-name">{product.name}</span>
                                                </div>

                                                <div className="history-col-price">
                                                    {(product.price || 0).toLocaleString()} VNĐ
                                                </div>

                                                <div className="history-col-size">
                                                    <span>{product.size}</span>
                                                </div>

                                                <div className="history-col-quantity">
                                                    <span>{product.quantity}</span>
                                                </div>

                                                <div className="history-col-total">
                                                    {((product.price || 0) * (product.quantity || 0)).toLocaleString()} VNĐ
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f0f0f0" }}>
                                        <div style={{ fontSize: "13px", color: "#666" }}>
                                            Phương thức thanh toán: <strong style={{ textTransform: "uppercase" }}>{order.paymentMethod}</strong>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: "15px", marginBottom: "8px" }}>
                                                Thành tiền (gồm ship): <span style={{ color: "#ff4d4f", fontWeight: "bold", fontSize: "18px" }}>
                                                    {(order.finalAmount || order.totalAmount || 0).toLocaleString()} VNĐ
                                                </span>
                                            </div>

                                            {(order.paymentMethod || "").toLowerCase() === "cod" &&
                                            (order.status || "").toLowerCase() === "pending" ? (
                                                <button
                                                    onClick={() => handleCancelOrder(order.orderId)}
                                                    style={{
                                                        backgroundColor: "#ff4d4f",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "6px 16px",
                                                        borderRadius: "20px",
                                                        fontSize: "13px",
                                                        cursor: "pointer",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Huỷ đơn hàng
                                                </button>
                                            ) : (order.status || "").toLowerCase() === "cancelled" ? (
                                                <span style={{ color: "#ff4d4f", fontSize: "13px", fontWeight: "bold" }}>
                                                    Đã huỷ
                                                </span>
                                            ) : null}
                                        </div>
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