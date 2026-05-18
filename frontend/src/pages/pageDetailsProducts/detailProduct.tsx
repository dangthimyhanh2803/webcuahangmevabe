import React from "react";
import {useParams} from "react-router-dom";
import sanpham from "../../assets/icons/Sanpham.png";
import "./detailProduct.css";

const DetailProduct: React.FC = () => {
    const {id} = useParams();

    // data giả (giống Home)
    const products = [
        {id: 1, name: "Sữa cho bé cao cấp", price: 250000, image: sanpham},
        {id: 2, name: "Tã em bé siêu thấm", price: 180000, image: sanpham},
        {id: 3, name: "Bình sữa an toàn", price: 120000, image: sanpham},
    ];

    const product = products.find((p) => p.id === Number(id));

    // fallback nếu không tìm thấy
    if (!product) {
        return <div className="page">Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="detail-page">
            <main className="detail-container">
                <nav className="detail-breadcrumb">
                    <a href="#">Trang chủ</a> /{" "}
                    <a href="#">Thời trang bé trai</a> /{" "}
                    <span>{product.name}</span>
                </nav>

                <section className="detail-product">
                    <div className="detail-gallery">
                        <div className="detail-main-image">
                            <img src={product.image} alt="Sản phẩm chính"/>
                            <button className="detail-nav-prev">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button className="detail-nav-next">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>

                        <div className="detail-thumbnail-list">
                            <div className="detail-thumb active">
                                <img src={product.image} alt="thumb"/>
                            </div>
                            <div className="detail-thumb">
                                <img src={product.image} alt="thumb"/>
                            </div>
                            <div className="detail-thumb">
                                <img src={product.image} alt="thumb"/>
                            </div>
                            <div className="detail-thumb">
                                <img src={product.image} alt="thumb"/>
                            </div>
                        </div>
                    </div>

                    <div className="detail-info">
                        <h1 className="detail-price">
                            {product.price.toLocaleString()}đ
                        </h1>

                        <h2 className="detail-title">
                            {product.name}
                        </h2>

                        <div className="detail-rating">
                            <span>4 </span>
                            <div className="detail-stars">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                            </div>

                            <span className="detail-review-count">Đánh giá: 145</span>
                        </div>

                        <div className="detail-shipping">
                            <p>
                                <i className="fa-solid fa-truck-fast"></i>
                                {" "}Giao hàng: Dự kiến nhận hàng 17 Dec - 19 Dec {">"}
                            </p>
                        </div>

                        <div className="detail-options">
                            <span>Size:</span>
                            <div className="detail-size-btns">
                                <button className="active">S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                            </div>
                        </div>

                        <div className="detail-quantity">
                            <span>Số lượng:</span>
                            <div className="detail-q-control">
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>
                        </div>

                        <div className="detail-actions">
                            <button className="detail-btn-cart">
                                <i className="fa-solid fa-cart-plus"></i>
                            </button>
                            <button className="detail-btn-buy">Mua hàng</button>
                        </div>
                    </div>
                </section>

                <section className="detail-related">
                    <h3 className="detail-section-title">Sản phẩm tương tự</h3>

                    <div className="detail-product-grid">
                        <div className="detail-card">
                            <img src={product.image} alt="sp"/>
                            <h4>{product.name}</h4>
                            <p className="detail-price-small">
                                {product.price.toLocaleString()} VNĐ
                            </p>
                            <button className="detail-add-quick">
                                <i className="fa-solid fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DetailProduct;