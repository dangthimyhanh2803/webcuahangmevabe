import React from "react";
import "./address.css";
import banner from "../../assets/icons/Sanpham.png";

const Address: React.FC = () => {
    return (
        <div className="address-page">
            <p className="breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href="/account"> Trang cá nhân</a> &gt;
                <a href="/address"> Địa chỉ của bạn</a>
            </p>

            <div className="address-container">

                {/* LEFT SIDEBAR */}
                <div className="left-sidebar">
                    <div className="user-box">
                        <div className="avatar"></div>
                        <p>Tên tài khoản</p>
                    </div>

                    <ul className="menu">
                        <li>Thẻ thành viên</li>
                        <li>Con cưng xu</li>
                        <li>Gói ưu đãi</li>
                        <li>Đơn mua</li>
                        <li className="active">Sổ địa chỉ</li>
                        <li>Voucher của tôi</li>
                        <li>Đánh giá của tôi</li>
                    </ul>
                </div>

                {/* CENTER FORM */}
                <div className="address-form">
                    <h3>Thêm mới địa chỉ nhận hàng</h3>
                    <p>Vui lòng xác nhận các nội dung bên dưới</p>

                    <input placeholder="Nhập tên..." />
                    <input placeholder="Nhập số điện thoại..." />

                    <div className="row">
                        <select>
                            <option>Chọn tỉnh</option>
                        </select>

                        <select>
                            <option>Chọn huyện</option>
                        </select>
                    </div>

                    <input placeholder="Nhập địa chỉ" />

                    <textarea placeholder="Ghi chú"></textarea>

                    <button className="btn-submit">
                        Cập nhật
                    </button>
                </div>
                <div className="right-sidebar">
                    <div className="info-card">
                        <img src={banner} alt="banner" />
                        <p>So sánh các loại tã quần tốt nhất hiện nay</p>
                    </div>

                    <div className="info-card">
                        <img src={banner} alt="banner" />
                        <p>So sánh các loại tã quần tốt nhất hiện nay</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Address;