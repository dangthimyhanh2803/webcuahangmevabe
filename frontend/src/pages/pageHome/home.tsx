import React, {useEffect, useState} from "react";
import ProductCard from "../../components/product/ProductCard";
import CategorySidebar from "../../components/product/CategorySidebar";
import Pagination from "../../components/pagination";
import sanpham from "../../assets/icons/Sanpham.png";
import banner6 from "../../assets/banners/banner6.png";
import banner5 from "../../assets/banners/banner5.png";
import "./home.css";
import { FaGift, FaFire, FaStar, FaTruck, FaMoneyBillWave } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {mockProducts} from "../../data/mockProducts";
interface Product {
    productId: number;
    productName: string;
    price: number;
    description: string;
    categoryId: number;
    categoryName: string;
    status: boolean;
    imageUrl?: string;
}

const Home: React.FC = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sort, setSort] = useState("default");

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(8);
    const sortedProducts = [...products].sort((a, b) => {

        if (sort === "price-asc") {
            return a.price - b.price;
        }

        if (sort === "price-desc") {
            return b.price - a.price;
        }

        return 0;
    });
    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProducts = sortedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const totalPages = Math.ceil(
        sortedProducts.length / itemsPerPage
    );
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {

            const response = await axios.get(
                "http://localhost:5000/api/product"
            );

            console.log(response.data);

            setProducts(response.data);

        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">

            {/* Breadcrumb */}
            <p className="breadcrumb">
                <a href="/">Trang chủ</a> &gt;
            </p>
            <div className="home-container">
                <CategorySidebar />
                <div className="product-section">
                    <div className="tabs">
                        <button>Sản phẩm tiêu biểu</button>
                        <button>Sản phẩm mới</button>
                        <button>Sản phẩm bán chạy</button>
                    </div>
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : (
                        <>

                            <div className="home-product-list">

                                {currentProducts.map((item) => (

                                    <ProductCard
                                        key={item.productId}
                                        productId={item.productId}
                                        name={item.productName}
                                        price={item.price}
                                        image={
                                            item.imageUrl
                                                ? item.imageUrl
                                                : "https://via.placeholder.com/150"
                                        }
                                    />

                                ))}

                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />

                        </>
                    )}

                </div>

                {/* RIGHT - BANNER + ƯU ĐÃI */}
                <div className="right-sidebar">

                    <div className="promo-box">

                        <h4 className="title-icon">
                            <FaFire className="icon fire" />
                            Ưu đãi hôm nay
                        </h4>

                        <img
                            src={banner6}
                            alt="banner"
                            className="promo-banner"
                        />

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

                        <img
                            src={banner5}
                            alt="banner"
                            className="promo-banner"
                        />

                        <p>
                            Sản phẩm chăm sóc mẹ & bé an toàn, chính hãng.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Home;