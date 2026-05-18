import "./productCard.css";
import React from "react";

type Product = {
    name: string;
    price: number;
    image: string;
};

const ProductCard = ({ name, price, image }: Product) => {
    return (
        <div className="pcard">
            <img src={image} alt={name} className="pcard-img" />

            <div className="pcard-info">
                <p className="pcard-name">{name}</p>
                <p className="pcard-price">{price.toLocaleString()} VND</p>
            </div>

            <button className="pcard-add">
                <i className="fa-solid fa-cart-plus"></i>
            </button>
        </div>
    );
};

export default ProductCard;