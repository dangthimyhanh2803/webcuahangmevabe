import "./productCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

type Product = {
    productId: number;
    name: string;
    price: number;
    image: string;
    onAddToCart?: () => void; // Thêm prop callback
};

const ProductCard = ({productId, name, price, image, onAddToCart}: Product) => {
    const navigate = useNavigate();
    return (
        <div className="pcard" onClick={() => navigate(`/detailproduct/${productId}`)}>
            <img src={image} alt={name} className="pcard-img"/>
            <div className="pcard-info">
                <p className="pcard-name">{name}</p>
                <p className="pcard-price">{price.toLocaleString()} VND</p>
            </div>
            <button className="pcard-add"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) onAddToCart();
                    }}>
                <i className="fa-solid fa-cart-plus"></i>
            </button>
        </div>
    );
};

export default ProductCard;