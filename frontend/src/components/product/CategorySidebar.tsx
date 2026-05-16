import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/category.css";
interface Category {
    categoryId: number;
    categoryName: string;
    icon: string;
}

const CategorySidebar: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {fetchCategories();}, []);
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/category");
            console.log(response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy category:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="category">
            <h3>Danh mục</h3>
            {loading ? (<p>Đang tải...</p>) : (
                <ul>
                    {categories.map((item) => (
                        <li key={item.categoryId}>
                            <img src={item.icon} alt={item.categoryName}/>
                            <span>{item.categoryName}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default CategorySidebar;