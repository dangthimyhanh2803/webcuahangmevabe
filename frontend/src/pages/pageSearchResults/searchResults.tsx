import React, { useEffect, useState } from "react";
import "./searchResults.css";
import ProductGrid from "../../components/product/ProductGrid";
import CategorySidebar from "../../components/product/CategorySidebar";
import Pagination from "../../components/pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Product } from "../../types/ProductType";
import axios from "axios";

const SearchResults: React.FC = () => {
    const keyword = useSelector((state: RootState) => state.search.keyword);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const itemsPerPage = 8;

    useEffect(() => {
        fetchSearch(keyword, selectedCategoryId);
    }, [keyword, selectedCategoryId]);

    const fetchSearch = async (kw: string, categoryId: number | null) => {
        setLoading(true);
        try {
            const params: Record<string, string> = { keyword: kw };
            if (categoryId) params.categoryId = String(categoryId);
            const response = await axios.get("http://localhost:5000/api/product/search", { params });
            const mapped: Product[] = response.data.map((p: any) => ({
                ...p,
                images: p.imageUrl
                    ? [{ imageId: 0, imageUrl: p.imageUrl, isMain: true }]
                    : [],
            }));
            setProducts(mapped);
            setCurrentPage(1);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCategory = (id: number | null) => {
        setSelectedCategoryId(id);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    return (
        <div className="search-page">
            <p className="breadcrumb">
                <a href="/">Trang chủ</a> &gt;
                <a href="/search"> Tìm kiếm</a>
            </p>

            <div className="search-container">
                <CategorySidebar
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={handleSelectCategory}
                />

                <div className="search-content">
                    <div className="search-header">
                        <h2>
                            {keyword
                                ? `Kết quả cho "${keyword}"`
                                : "Tất cả sản phẩm"}
                            {!loading && (
                                <span style={{ fontSize: "14px", fontWeight: "normal", marginLeft: "8px", color: "#888" }}>
                                    ({products.length} sản phẩm)
                                </span>
                            )}
                        </h2>

                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="default">Sắp xếp</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                        </select>
                    </div>

                    {loading ? (
                        <p>Đang tìm kiếm...</p>
                    ) : currentProducts.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#888", padding: "40px 0" }}>
                            Không tìm thấy sản phẩm phù hợp.
                        </p>
                    ) : (
                        <>
                            <ProductGrid products={currentProducts} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;