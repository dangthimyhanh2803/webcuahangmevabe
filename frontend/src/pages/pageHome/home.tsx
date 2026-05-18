import React from "react";
import ProductCard from "../../components/product/ProductCard";
import CategorySidebar from "../../components/product/CategorySidebar";
import sanpham from "../../assets/icons/Sanpham.png";
import banner6 from "../../assets/banners/banner6.png";
import banner5 from "../../assets/banners/banner5.png";
import "./home.css";
import { FaGift, FaFire, FaStar, FaTruck, FaMoneyBillWave } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const products = [
        { id: 1, name: "Sữa cho bé cao cấp", price: 250000, image: sanpham },
        { id: 2, name: "Tã em bé siêu thấm", price: 180000, image: sanpham },
        { id: 3, name: "Bình sữa an toàn", price: 120000, image: sanpham },
    ];

    return (
        <div className="home">
            {/* Breadcrumb */}
            <p className="breadcrumb">
                <a href="/">Trang chủ</a> &gt;
            </p>

            {/* ===== LAYOUT 3 CỘT ===== */}
            <div className="home-container">

                {/* LEFT - DANH MỤC */}
                <CategorySidebar />

                {/* CENTER - SẢN PHẨM */}
                <div className="product-section">
                    <div className="tabs">
                        <button>Sản phẩm tiêu biểu</button>
                        <button>Sản phẩm mới</button>
                        <button>Sản phẩm bán chạy</button>
                    </div>

                    <div className="home-product-list">
                        {products.map((item) => (
                            <div key={item.id} onClick={() => navigate(`/detailproduct/${item.id}`)}>
                                <ProductCard
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT - BANNER + ƯU ĐÃI */}
                <div className="right-sidebar">


                    <div className="promo-box">
                        <h4 className="title-icon">
                            <FaFire className="icon fire" />
                            Ưu đãi hôm nay
                        </h4>

                        <img src={banner6} alt="banner" className="promo-banner"/>

                        <ul>
                            <li>
                                <FaGift className="icon" />
                                Giảm 20% cho đơn từ 500K
                            </li>

                            <li>
                                <FaTruck className="icon" />
                                Freeship toàn quốc
                            </li>

                            <li>
                                <FaMoneyBillWave className="icon" />
                                Hoàn tiền 10%
                            </li>
                        </ul>
                    </div>

                    <div className="promo-box">
                        <h4 className="title-icon">
                            <FaStar className="icon star" />
                            Gợi ý cho bạn
                        </h4>
                        <img src={banner5} alt="banner" className="promo-banner" />
                        <p>Sản phẩm chăm sóc mẹ & bé an toàn, chính hãng.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;