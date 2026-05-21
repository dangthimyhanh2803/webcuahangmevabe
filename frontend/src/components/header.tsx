import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setKeyword} from "../redux/search";
import {useNavigate} from "react-router-dom";
import "./style/header.css";
import logo from "../assets/logo/Logo.png";
import userIcon from "../assets/header/user.svg";
import avatar from "../assets/header/avatar.png";
import bell from "../assets/header/badge.svg";
import cart from "../assets/header/cart.svg";
import searchIcon from "../assets/header/search.svg";
type User = {
    userId: number;
    userName: string;
    email: string;
    phone: string;
    avatar?: string;
};

const Header: React.FC = () => {
    const [keyword, setKey] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const dispatch =
        useDispatch();
    const navigate =
        useNavigate();
    // đọc localStorage
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        loadUser();
        window.addEventListener("userUpdated", loadUser);
        return () => window.removeEventListener("userUpdated", loadUser);
    }, []);

    const handleSearch = () => {
        dispatch(setKeyword(keyword));
        navigate("/search");
    };
    return (
        <div className="header">
            {/* LEFT */}
            <div className="header-left">
                <img src={logo} alt="logo" className="header-logo" onClick={() => navigate("/")}/>
            </div>

            {/* CENTER */}
            <div className="header-center">
                <div className="search-box">
                    <img src={searchIcon} alt="search"/>
                    <input type="text" placeholder="Bạn cần tìm gì?" value={keyword}
                        onChange={(e) => setKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
                </div>
            </div>

            {/* RIGHT */}
            <div className="header-right">
                {/* CART */}
                <div className="cart-group" onClick={() => navigate("/cart")}>
                    <img src={cart} alt="cart"/>

                    <span> Giỏ hàng</span>
                </div>
                {/* USER */}
                {
                    user ? (
                        <div className="user-profile" onClick={() => navigate("/account")}>
                            <img src={user.avatar ? user.avatar : avatar} alt="avatar" className="user-avatar"/>
                            <span>{user.userName}</span>
                        </div>
                    ) : (
                        <div className="user-group" onClick={() => navigate("/login")}>
                            <img src={userIcon} alt="user"/>
                            <span>Đăng nhập</span>
                        </div>
                    )
                }
                {/* BELL */}
                <div className="bell-group">
                    <img src={bell} alt="bell"/>
                </div>

            </div>

        </div>
    );
};

export default Header;