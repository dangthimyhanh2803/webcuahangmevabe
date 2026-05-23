import React from "react";
import "./history.css";
import {useNavigate} from "react-router-dom";

import AccoutMenu from "../../components/accoutMenu";
import sanpham from "../../assets/icons/Sanpham.png";

const History = () => {
    const products = [
        { id: 1, name: "Sữa cho bé cao cấp", price: 250000, image: sanpham },
        { id: 2, name: "Tã em bé siêu thấm", price: 180000, image: sanpham },
        { id: 3, name: "Bình sữa an toàn", price: 120000, image: sanpham },
    ];
    const navigate = useNavigate();
    return (
        <div className="history">
            {/* Breadcrumb */}
            <p className="history-breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href="/account"> Trang cá nhân</a> &gt;
                <a href="/history"> Lịch sử đơn hàng</a> &gt;
            </p>
            <div className="history-container">
                <AccoutMenu />
                <div className="history-section">
                    <div className="history-tabs">
                        <button>Tất cả</button>
                        <button>Chờ thanh toán</button>
                        <button>Vận chuyển</button>
                        <button>Chờ giao hàng</button>
                        <button>Hoàn thành</button>
                        <button>Đã hủy</button>
                        <button>Trả hàng/ Hoàn tiền</button>
                    </div>

                    <div className="history-product">
                        <div className="history-header">
                            <span className="history-col-product">Sản phẩm</span>
                            <span>Đơn giá</span>
                            <span>Size</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                        </div>
                        {products.map((product) => (
                            <div className="history-item" key={product.id}>
                                <div className="history-col-product">
                                    <img src={product.image} alt={product.name} />
                                    <span className="history-item-name">{product.name}</span>
                                </div>

                                <div className="history-col-price">
                                    {product.price.toLocaleString()} VNĐ
                                </div>

                                <div className="history-col-size">
                                    <select>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                    </select>
                                </div>

                                <div className="history-col-quantity">
                                    <div className="history-q-btn">
                                        <button>-</button>
                                        <span>1</span>
                                        <button>+</button>
                                    </div>
                                </div>

                                <div className="history-col-total">
                                    {product.price.toLocaleString()} VNĐ
                                    <i className="fa-solid fa-trash-can delete-icon"></i>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default History;