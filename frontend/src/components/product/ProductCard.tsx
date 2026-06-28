import "./productCard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
    productId: number;
    name: string;
    price: number;
    image: string;
};

const ProductCard = ({productId, name, price, image}: Product) => {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();

        const userStr = localStorage.getItem("user");
        if (!userStr) {
            navigate("/login");
            return;
        }
        const user = JSON.parse(userStr);
        if (user.isVerified === false || user.isVerified === 0) {
            navigate("/login");
            return;
        }

        const cartItem = {
            id: productId,
            name,
            image,
            quantity: 1,
            size: "S",
            checked: true,
            priceBySize: { S: price, M: price + 20000, L: price + 40000 }
        };

        const existing = localStorage.getItem("cart_products");
        const cart = existing ? JSON.parse(existing) : [];

        const idx = cart.findIndex((item: any) => item.id === productId && item.size === "S");
        if (idx !== -1) {
            cart[idx].quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart_products", JSON.stringify(cart));

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };
    return (
        <div className="pcard" onClick={() => navigate(`/detailproduct/${productId}`)}>
            <img src={image} alt={name} className="pcard-img"/>
            <div className="pcard-info">
                <p className="pcard-name">{name}</p>
                <p className="pcard-price">{price.toLocaleString()} VND</p>
            </div>
            {added && <span className="pcard-toast">Đã thêm vào giỏ!</span>}
            <button className={`pcard-add${added ? ' added' : ''}`} onClick={handleAddToCart}>
                <i className={`fa-solid ${added ? 'fa-check' : 'fa-cart-plus'}`}></i>
            </button>
            <button className="pcard-add"
                onClick={(e) => {e.stopPropagation();}}>
                <i className="fa-solid fa-cart-plus"></i>
            </button>
        </div>
    );
};

export default ProductCard;