import api from './api';
import type { CreateProductInput, Product } from '../types/product'


export const getAllProducts = async () : Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

export const createProduct = async (data: CreateProductInput) : Promise<Product> => {
    const response = await api.post<Product>('/products', data);
    return response.data;
};

export const updateProduct = async (id: number, data: Partial<CreateProductInput>) : Promise<Product> => {
    const response = await api.patch<Product>(`/products/${id}`,data);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};




