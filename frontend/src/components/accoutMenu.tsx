import React from "react";
import map from "../assets/icons/icondiachi.png";
import './style/accountMenu.css';

const AccountMenu: React.FC = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="menu-account">
            <div className="user-box">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="avatar"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                ) : (
                    <div className="avatar" />
                )}
                <p>{user.userName || "Tài khoản"}</p>
                <div className="address-link">
                    <img src={map} alt="map" className="promo-map" />
                    <button onClick={() => window.location.href = "/address"}>
                        Địa chỉ nhận hàng
                    </button>
                </div>
            </div>

            <ul className="menu">
                <li>Thẻ thành viên</li>
                <li>Xu của bạn</li>
                <li>Gói ưu đãi</li>
                <li>Địa chỉ đơn hàng</li>
                <a href="/history">Lịch sử đơn hàng</a>
                <li>Voucher của tôi</li>
                <li>Đánh giá của tôi</li>
                <li className="active">Thông tin cá nhân</li>
            </ul>
        </div>
    );
};

export default AccountMenu;