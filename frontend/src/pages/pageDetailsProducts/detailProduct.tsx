import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './detailProduct.css';

interface Product {
    productId: number;
    productName: string;
    categoryId: number;
    price: number;
    discountPercentage: number | null;
    description: string | null;
    size?: string | null;
    stockQuantity?: number;
    productType?: string;
    image: string | null;
    productStatus?: string;
    categoryName?: string;
}

// Thêm interface cho Đánh giá
interface Review {
    reviewId?: number;
    userId?: number;
    userName?: string;
    rating: number;
    comment: string;
    created_at?: string;
}

const DetailProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedSize, setSelectedSize] = useState<string>('S');
    const [quantity, setQuantity] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<'desc' | 'review'>('desc');

    // === STATE CHO CHỨC NĂNG ĐÁNH GIÁ ===
    const [reviews, setReviews] = useState<Review[]>([]);
    const [userRating, setUserRating] = useState<number>(5);
    const [userComment, setUserComment] = useState<string>('');
    const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // 1. Lấy thông tin sản phẩm
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                const data: Product = response.data;
                setProduct(data);

                if (data?.size && typeof data.size === 'string') {
                    const sizes = data.size.split(',').map(s => s.trim());
                    if (sizes.length > 0) setSelectedSize(sizes[0]);
                }

                // 2. Lấy danh sách đánh giá của sản phẩm này
                try {
                    const reviewRes = await axios.get(`http://localhost:5000/api/review/${id}`);
                    setReviews(reviewRes.data);
                } catch (reviewErr) {
                    console.log("Sản phẩm chưa có đánh giá hoặc API review chưa sẵn sàng.");
                }

                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
                alert("Không thể tải thông tin sản phẩm.");
                setLoading(false);
            }
        };

        if (id) fetchProductData();
        window.scrollTo(0, 0);
    }, [id]);

    const productImages = product?.image
        ? [`http://localhost:5000/images/${product.image}`, '/img/thumb1.jpg', '/img/thumb2.jpg']
        : ['/img/default-product.jpg'];
    const [mainImage, setMainImage] = useState(productImages[0]);

    useEffect(() => {
        if(product?.image) setMainImage(`http://localhost:5000/images/${product.image}`);
    }, [product]);

    const handleQuantityChange = (type: 'plus' | 'minus') => {
        setQuantity(prev => {
            const maxStock = product?.stockQuantity || 100;
            if (type === 'plus') return prev < maxStock ? prev + 1 : prev;
            return prev > 1 ? prev - 1 : 1;
        });
    };

    const calculatePrices = () => {
        if (!product) return { originalPrice: '0', finalPrice: '0', discount: 0, rawFinalPrice: 0, totalPrice: '0', rawTotalPrice: 0, temporaryTotal: 0, discountAmount: 0 };

        let basePrice = product.price || 0;
        if (selectedSize === 'M') basePrice += 20000;
        if (selectedSize === 'L') basePrice += 40000;

        const discount = product.discountPercentage || 0;
        const finalPricePerItem = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;

        const rawTemporaryTotal = basePrice * quantity;
        const rawFinalTotal = finalPricePerItem * quantity;
        const rawDiscountAmount = rawTemporaryTotal - rawFinalTotal;

        return {
            originalPrice: basePrice.toLocaleString('vi-VN'),
            finalPrice: finalPricePerItem.toLocaleString('vi-VN'),
            discount,
            rawFinalPrice: finalPricePerItem,
            totalPrice: rawFinalTotal.toLocaleString('vi-VN'),
            rawTotalPrice: rawFinalTotal,
            temporaryTotal: rawTemporaryTotal,
            discountAmount: rawDiscountAmount
        };
    };

    const { originalPrice, finalPrice, discount, rawFinalPrice, totalPrice, rawTotalPrice, temporaryTotal, discountAmount } = calculatePrices();

    // === HÀM XỬ LÝ GỬI ĐÁNH GIÁ ===
    const handleSubmitReview = async () => {
        if (!userComment.trim()) {
            alert("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        try {
            setIsSubmittingReview(true);

            // Dữ liệu gửi lên server (Tạm giả định userId = 1, thực tế bạn lấy từ LocalStorage hoặc Context khi user đăng nhập)
            const newReview = {
                productId: product?.productId,
                userId: 1, // <--- Thay đổi phần này theo user đang đăng nhập
                rating: userRating,
                comment: userComment
            };

            await axios.post('http://localhost:5000/api/review', newReview);

            alert("Cảm ơn bạn đã gửi đánh giá!");

            // Thêm ngay đánh giá mới vào danh sách hiện tại để UI cập nhật không cần load lại trang
            setReviews([{ ...newReview, userName: 'Bạn', created_at: new Date().toISOString() }, ...reviews]);
            setUserComment('');
            setUserRating(5);
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            alert("Có lỗi xảy ra, không thể gửi đánh giá. Vui lòng kiểm tra lại Backend!");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (loading) return <div className="loading-container">Đang tải...</div>;
    if (!product) return <div className="error-container">Không tìm thấy sản phẩm.</div>;

    const availableSizes = (product?.size && typeof product.size === 'string')
        ? product.size.split(',').map(s => s.trim())
        : ['S', 'M', 'L'];

    // Tính trung bình sao
    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1)
        : '5.0';

    return (
        <div className="product-detail-page">
            <div className="container detail-content-wrapper">
                <div className="breadcrumb-container">
                    <Link to="/">Trang chủ</Link> /
                    <Link to={`/category/${product.categoryId}`}>{product.categoryName || 'Danh mục'}</Link> /
                    <span>{product.productName}</span>
                </div>

                <div className="product-main-info row">
                    <div className="col-md-7 product-gallery">
                        <div className="main-image-container">
                            <img src={mainImage} alt={product.productName} className="img-fluid main-img" />
                        </div>
                        <div className="thumbnail-list">
                            {productImages.map((img, index) => (
                                <div key={index} className={`thumbnail-item ${mainImage === img ? 'active' : ''}`} onClick={() => setMainImage(img)}>
                                    <img src={img} alt={`thumb-${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-5 product-shop-ops d-flex flex-column justify-content-center ps-md-5">
                        <h1 className="product-title">{product.productName}</h1>

                        <div className="product-rating-row">
                            <div className="stars" style={{color: '#fb71b0'}}>
                                {'★'.repeat(Math.round(Number(avgRating)))}{'☆'.repeat(5 - Math.round(Number(avgRating)))}
                                <span style={{color: '#333'}}>({avgRating})</span>
                            </div>
                            <span className="divider">|</span>
                            <span className="text-muted">{reviews.length} Đánh giá</span>
                            <span className="divider">|</span>
                            <span className="text-muted">{product.stockQuantity ? 500 : 0} Đã bán</span>
                        </div>

                        <div className="product-price-box">
                            {discount > 0 ? (
                                <>
                                    <span className="original-price">{originalPrice} đ</span>
                                    <span className="final-price">{finalPrice} đ</span>
                                    <span className="discount-tag">-{discount}%</span>
                                </>
                            ) : (
                                <span className="final-price">{finalPrice} đ</span>
                            )}
                        </div>

                        <div className="variant-group">
                            <label className="variant-label">Kích cỡ</label>
                            <div className="variant-options">
                                {availableSizes.map(size => (
                                    <button key={size} className={`btn-variant ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="quantity-group">
                            <label className="variant-label">Số lượng</label>
                            <div className="quantity-controller">
                                <button onClick={() => handleQuantityChange('minus')}>-</button>
                                <input type="number" value={quantity} readOnly />
                                <button onClick={() => handleQuantityChange('plus')}>+</button>
                            </div>
                            <span className="stock-info text-muted">
                                {product.stockQuantity || 100} sản phẩm có sẵn
                            </span>
                        </div>

                        <div className="dynamic-total-box" style={{ marginTop: '20px', padding: '12px 18px', background: '#fff5f8', borderRadius: '10px', border: '1px dashed #fb71b0' }}>
                            <span style={{ fontSize: '15px', fontWeight: '500', color: '#555' }}>Tổng tạm tính ({quantity} sản phẩm):</span>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fb71b0', marginTop: '4px' }}>
                                {totalPrice} đ
                            </div>
                        </div>

                        <div className="action-buttons" style={{ marginTop: '25px' }}>
                            <Link to="/payment" state={{
                                checkoutProducts: [{ id: product.productId, name: product.productName, image: product.image ? `http://localhost:5000/images/${product.image}` : '/img/default-product.jpg', quantity, size: selectedSize, priceBySize: { [selectedSize]: rawFinalPrice } }],
                                temporaryTotal, discountAmount, finalTotal: rawTotalPrice
                            }} style={{ textDecoration: 'none' }}>
                                <button className="btn-buy-now" style={{ width: '100%', padding: '15px', fontSize: '18px', fontWeight: 'bold', borderRadius: '30px', boxShadow: '0 4px 15px rgba(251, 113, 176, 0.4)' }}>
                                    MUA NGAY
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="product-bottom-info">
                    <div className="tab-headers">
                        <button className={`tab-link ${activeTab === 'desc' ? 'active' : ''}`} onClick={() => setActiveTab('desc')}>
                            MÔ TẢ SẢN PHẨM
                        </button>
                        <button className={`tab-link ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>
                            ĐÁNH GIÁ ({reviews.length})
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'desc' ? (
                            <div className="description-content">
                                <h4>Thông tin chi tiết</h4>
                                <div className="full-text">
                                    {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                                </div>
                            </div>
                        ) : (
                            <div className="reviews-content">
                                {/* FORM ĐÁNH GIÁ MỚI */}
                                <div className="review-form-container" style={{ padding: '20px', background: '#f9f9f9', borderRadius: '10px', marginBottom: '20px' }}>
                                    <h5>Viết đánh giá của bạn</h5>
                                    <div className="star-selection" style={{ fontSize: '24px', cursor: 'pointer', marginBottom: '10px' }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span
                                                key={star}
                                                onClick={() => setUserRating(star)}
                                                style={{ color: star <= userRating ? '#fb71b0' : '#ccc' }}
                                            >★</span>
                                        ))}
                                    </div>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                                        value={userComment}
                                        onChange={(e) => setUserComment(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px' }}
                                    ></textarea>
                                    <button
                                        className="btn-buy-now"
                                        onClick={handleSubmitReview}
                                        disabled={isSubmittingReview}
                                        style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', border: 'none' }}
                                    >
                                        {isSubmittingReview ? 'Đang gửi...' : 'Gửi Đánh Giá'}
                                    </button>
                                </div>

                                {/* DANH SÁCH ĐÁNH GIÁ CŨ */}
                                <h4>Đánh giá từ khách hàng</h4>
                                {reviews.length === 0 ? (
                                    <p className="text-muted">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                                ) : (
                                    <div className="review-list">
                                        {reviews.map((rev, index) => (
                                            <div key={index} className="review-item" style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                                                <div className="d-flex align-items-center mb-2">
                                                    <strong style={{ marginRight: '10px' }}>{rev.userName || 'Khách hàng ẩn danh'}</strong>
                                                    <span style={{ color: '#fb71b0', fontSize: '14px' }}>
                                                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                                    </span>
                                                </div>
                                                <p style={{ margin: '5px 0', color: '#555' }}>{rev.comment}</p>
                                                <span style={{ fontSize: '12px', color: '#999' }}>
                                                    {rev.created_at ? new Date(rev.created_at).toLocaleDateString('vi-VN') : 'Vừa xong'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;