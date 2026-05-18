import { Product } from "../types/ProductType";
import sanpham from "../assets/icons/Sanpham.png";
export const mockProducts: Product[] = [
    {
        productId: 1,
        productName: "Sữa cho bé",
        price: 300000,
        description: "Sữa dinh dưỡng",
        categoryId: 1,
        status: true,
        created_at: "2026-01-01",
        images: [
            {
                imageId: 1,
                imageUrl: sanpham,
                isMain: true
            }
        ]
    },

    {
        productId: 2,
        productName: "Bỉm cao cấp",
        price: 250000,
        description: "Bỉm siêu thấm hút",
        categoryId: 2,
        status: true,
        created_at: "2026-01-01",
        images: [
            {
                imageId: 2,
                imageUrl: sanpham,
                isMain: true
            }
        ]
    },
    {
        productId: 3,
        productName: "Bỉm cao cấp",
        price: 250000,
        description: "Bỉm siêu thấm hút",
        categoryId: 2,
        status: true,
        created_at: "2026-01-01",
        images: [
            {
                imageId: 2,
                imageUrl: sanpham,
                isMain: true
            }
        ]
    },{
        productId: 3,
        productName: "Bỉm cao cấp",
        price: 250000,
        description: "Bỉm siêu thấm hút",
        categoryId: 2,
        status: true,
        created_at: "2026-01-01",
        images: [
            {
                imageId: 2,
                imageUrl: sanpham,
                isMain: true
            }
        ]
    }


];