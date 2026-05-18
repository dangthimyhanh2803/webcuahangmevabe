import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setKeyword } from "../redux/search";
import { useNavigate } from 'react-router-dom';

import './style/header.css';
import logo from '../assets/logo/Logo.png';
import user from '../assets/header/user.svg';
import bell from '../assets/header/badge.svg';
import cart from '../assets/header/cart.svg'; // thêm icon chuông
import searchIcon from '../assets/header/search.svg'; // icon search

const Header: React.FC = () => {
    const [keyword, setKey] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        dispatch(setKeyword(keyword));
        navigate("/search");
    };

    return (
        <div className="header">
            <div className="header-left">
                <img
                    src={logo}
                    alt="logo"
                    className="header-logo"
                    onClick={() => navigate('/home')}
                />
            </div>
            <div className="header-center">
                <div className="search-box">
                    <img src={searchIcon} alt="search" />
                    <input
                        type="text"
                        placeholder="Bạn cần tìm gì?"
                        value={keyword}
                        onChange={(e) => setKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
            </div>

            {/* RIGHT */}
            <div className="header-right">
                <div className="cart-group" onClick={() => navigate('/cart')}>
                    <img src={cart} alt="cart" />
                    <span>Giỏ hàng</span>
                </div>
                <div className="user-group" onClick={() => navigate('/login')}>
                    <img src={user} alt="user" />
                    <span>Đăng nhập</span>
                </div>
                <div className="bell-group">
                    <img src={bell} alt="bell" />
                </div>
            </div>

        </div>
    );
};

export default Header;