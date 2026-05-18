import React from "react";
import "./account.css";
import map from "../../assets/icons/icondiachi.png";

const AccountPage: React.FC = () => {
    return (
        <div className="account-page">

            {/* BREADCRUMB */}
            <p className="breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href="/account">Trang cá nhân</a>
            </p>
            <div className="account-container">

                {/* LEFT SIDEBAR */}
                <div className="left-sidebar">
                    <div className="user-box">
                        <div className="avatar"></div>
                        <p>Tên tài khoản</p>
                        <div className="address-link">
                            <img src={map} alt="map" className="promo-map" />
                            <button onClick={() => window.location.href = "/address"}>
                                Địa chỉ nhận hàng
                            </button>
                        </div>
                    </div>

                    <ul className="menu">
                        <li>Thẻ thành viên</li>
                        <li>Con cưng xu</li>
                        <li>Gói ưu đãi</li>
                        <li>Đơn mua</li>
                        <li>Sổ địa chỉ</li>
                        <li>Voucher của tôi</li>
                        <li className="active">Thông tin cá nhân</li>
                    </ul>
                </div>

                {/* CENTER FORM */}
                <div className="account-form">
                    <div className="account-form-wrapper ">
                        <div className="form-left">
                            <h3>Thông tin cá nhân</h3>
                            <p>Vui lòng cập nhật đầy đủ thông tin bên dưới</p>

                            <input placeholder="Nhập tên..." />
                            <input placeholder="Nhập số điện thoại..." />
                            <input placeholder="Nhập email..." />

                            <div className="row">
                                <select>
                                    <option>Giới tính</option>
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                </select>

                                <input type="date" />
                            </div>
                            <button className="btn-submit">
                                Cập nhật
                            </button>
                        </div>
                        <div className="form-right">
                            <div className="avatar-large"></div>

                            <button className="btn-upload">
                                Chọn ảnh
                            </button>
                        </div>
                    </div>

                    {/* RIGHT AVATAR
                        */}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;