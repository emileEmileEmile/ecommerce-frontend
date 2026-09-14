export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
}