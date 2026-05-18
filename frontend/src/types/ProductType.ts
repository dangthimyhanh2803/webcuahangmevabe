export type ProductImage = {
    imageId: number;
    imageUrl: string;
    isMain: boolean;
};

export type Product = {
    productId: number;
    productName: string;
    price: number;
    description: string;
    categoryId: number;
    status: boolean;
    created_at: string;
    images: ProductImage[];
};