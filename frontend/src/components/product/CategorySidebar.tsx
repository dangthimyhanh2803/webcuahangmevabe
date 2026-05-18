import React from "react";
import "../style/category.css";

import icon1 from "../../assets/icons/dogiadung.png";
import icon2 from "../../assets/icons/thegioisua.png";
import icon3 from "../../assets/icons/bimta.png";
import icon4 from "../../assets/icons/thucpham_douong.png";
import icon5 from "../../assets/icons/chamsocsuckhoe.png";
import icon6 from "../../assets/icons/thoigiansukien.png";
import icon7 from "../../assets/icons/dochoihoctap.png";
import icon8 from "../../assets/icons/xetreem.png";
import icon9 from "../../assets/icons/chamsocmevabe.png";
import icon10 from "../../assets/icons/mypham.png";


const categories = [
    { name: "Đồ dùng - Gia dụng", icon: icon1 },
    { name: "Thế giới sữa", icon: icon2 },
    { name: "Bỉm, tã", icon: icon3 },
    { name: "Thực phẩm & Đồ uống", icon: icon4 },
    { name: "Chăm sóc sức khỏe", icon: icon5 },
    { name: "Thời gian & Sự kiện", icon: icon6 },
    { name: "Đồ chơi & Học tập", icon: icon7 },
    { name: "Xe trẻ em", icon: icon8 },
    { name: "Chăm sóc mẹ và bé", icon: icon9 },
    { name: "Mỹ phẩm", icon: icon10 },
];

const CategorySidebar: React.FC = () => {
    return (
        <div className="category">
            <h3>Danh mục</h3>
            <ul>
                {categories.map((item, index) => (
                    <li key={index}>
                        <img src={item.icon} alt={item.name} />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;