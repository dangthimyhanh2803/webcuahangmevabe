import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setKeyword, clearKeyword } from "../redux/search";
import { useNavigate } from 'react-router-dom';

import './style/header2.css';
import logo from '../assets/logo/Logo.png';
import user from '../assets/header/user.svg';
import badge from '../assets/header/badge.svg';

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} alt="logo" className="header-logo" onClick={() => navigate('/home')}/>
            </div>
            <div className="header-right">
                <div className="user-group">
                    <a className="login-link">Đăng nhập</a>
                    <img src={user} alt="user" className="header-icon"
                        onClick={() => {setShowSearch(!showSearch);if (showSearch) dispatch(clearKeyword());}}/>
                </div>
                <img src={badge} alt="cart" className="header-icons" onClick={() => navigate('/cart')}/>
            </div>
        </div>
    );
};

export default Header;