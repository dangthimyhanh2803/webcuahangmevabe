import React, { useState } from "react";
import "./searchResults.css";
import ProductGrid from "../../components/product/productGrid";
import CategorySidebar from "../../components/product/CategorySidebar";
import banner1 from "../../assets/banners/banner1.png";
import banner2 from "../../assets/banners/banner2.png";
import banner3 from "../../assets/banners/banner3.png";
import { mockProducts } from "../../data/mockProducts";


const SearchResults: React.FC = () => {
    const [sort, setSort] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const sortedProducts = [...mockProducts].sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProducts = sortedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    return (
        <div className="search-page">
            {/* Breadcrumb */}
            <p className="breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href={"/search"}> Tìm kiếm</a>
            </p>

            <div className="search-container">
                {/* LEFT - CATEGORY */}
                <CategorySidebar />

                {/* RIGHT */}
                <div className="search-content">
                    {/* TOP BAR */}
                    <div className="search-header">
                        <h2>Kết quả tìm kiếm</h2>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="default">Sắp xếp</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                        </select>
                    </div>
                    <div className="banner-container">
                        <img src={banner1} alt="banner1" />
                        <img src={banner2} alt="banner2" />
                        <img src={banner3} alt="banner3" />
                    </div>
                    {/* PRODUCT LIST */}
                    <ProductGrid products={currentProducts} />

                    <div className="pagination">
                        <button className="page-nav" disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}>◀
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={currentPage === index + 1 ? "active" : ""}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button className="page-nav" disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}>▶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;