import React from "react";
import { Product } from "../../types/ProductType";
import ProductCard from "./ProductCard";
import "./productGrid.css";
interface Props {
    products: Product[];
}
const ProductGrid: React.FC<Props> = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map(product => {
                const mainImage =
                    product.images.find(img => img.isMain)?.imageUrl ||
                    product.images[0]?.imageUrl ||
                    "";

                return (
                    <ProductCard
                        key={product.productId}
                        name={product.productName}
                        price={product.price}
                        image={mainImage}
                    />
                );
            })}
        </div>
    );
};

export default ProductGrid;